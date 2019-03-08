'use strict';

module.exports = {
  requireAnon (req, res, next) {
    if (req.session.currentUser) {
      res.redirect('/');
      return;
    }
    next();
  },
  requireUser (req, res, next) {
    if (!req.session.currentUser) {
      res.redirect('/');
      return;
    }
    next();
  },
  requireFieldsSignup (req, res, next) {
    const { username, password, name, email } = req.body;
    if (!password || !username || !email || !name) {
      req.flash('validation', 'You need to fill all the parameters');
      res.redirect(`/auth${req.path}`);
      return;
    }
    next();
  },
  requireFieldsLogin (req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('validation', 'Username or password missing');
      res.redirect(`/auth${req.path}`);
      return;
    }
    next();
  },
  requireFieldsNewEvent (req, res, next) {
    const { title, description, address, dateEvent, time } = req.body;
    if (!title || !description || !address || !dateEvent || !time) {
      req.flash('validation', 'You need to fill all the parameters');
      res.redirect(`/events${req.path}`);
    }
    next();
  }
};
