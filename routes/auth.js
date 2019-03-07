const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
// const { requireAnon } = require('../middlewares/auth');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const { name, username, password, email } = req.body;
  try {
    const result = await User.findOne({ username });
    if (result) {
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

module.exports = router;
