'use strict';

const express = require('express');
const router = express.Router();
const { requireUser } = require('../middlewares/auth');
const Event = require('../models/Event');

router.get('/new', requireUser, (req, res, next) => {
  res.render('events/create-event');
});

router.post('/new', requireUser, async (req, res, next) => {
  const { title, description, address, date, time } = req.body;
  const event = { title, description, address, date, time };
  console.log(event);
  try {
    event.creator = req.session.currentUser._id;
    await Event.create(event);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
