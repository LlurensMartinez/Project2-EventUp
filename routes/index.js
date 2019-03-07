'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    const user = req.session.currentUser;
    res.render('home', user);
  }
  res.render('index');
});

module.exports = router;
