const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { requireAnon, requireFieldsSignup, requireFieldsLogin, requireUser } = require('../middlewares/auth');
const passport = require('passport');

const saltRounds = 10;

router.get('/signup', requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validation')
  };
  res.render('auth/signup', { data });
});

router.post('/signup', requireAnon, requireFieldsSignup, async (req, res, next) => {
  const { name, username, password, email } = req.body;
  try {
    const result = await User.findOne({ username });
    if (result) {
      req.flash('validation', 'This username is taken');
      res.redirect('/auth/signup');
      return;
    }
    // Encryptar password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Crear el usuario
    const newUser = {
      name,
      email,
      username,
      password: hashedPassword
    };
    const createdUser = await User.create(newUser);
    // Guardamos el usuario en la session
    req.session.currentUser = createdUser;
    // Redirigimos para la homepage
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/login', requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validation')
  };
  res.render('auth/login', { data });
});

router.post('/login', requireAnon, requireFieldsLogin, async (req, res, next) => {
  // Extraer información del body
  const { username, password } = req.body;
  try {
    // comprobar que el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      req.flash('validation', 'Username or password incorrect');
      res.redirect('/auth/login');
      return;
    }
    // comparar contrasena
    if (bcrypt.compareSync(password, user.password)) {
      // guardar la session
      req.session.currentUser = user;
      // redirigir
      res.redirect('/');
    } else {
      req.flash('validation', 'Username or password incorrect');
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res, next) => {
    req.session.currentUser = req.user;
    res.redirect('/');
  });

// router.get('/logic/facebook', async (req, res, next) => {
//   console.log(app.locals.currentUser.displayName);
// });

router.post('/logout', requireUser, async (req, res, next) => {
  delete req.session.currentUser;

  res.redirect('/');
});

module.exports = router;
