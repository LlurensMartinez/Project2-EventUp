'use strict';

const express = require('express');
const router = express.Router();
const { requireUser } = require('../middlewares/auth');

router.get('/new', requireUser, (req, res, next) => {
  res.render('events/create-event');
});

router.post('new', requireUser, async (req, res, next) => {
  const { name, username, }
})

module.exports = router;
