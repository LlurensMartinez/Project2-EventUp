'use strict';

const express = require('express');
const router = express.Router();
const { requireUser, requireFieldsNewEvent } = require('../middlewares/auth');
const Event = require('../models/Event');

router.get('/new', requireUser, (req, res, next) => {
  const data = {
    message: req.flash('validation')
  };
  res.render('events/create-event', data);
});

router.post('/new', requireUser, requireFieldsNewEvent, async (req, res, next) => {
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
