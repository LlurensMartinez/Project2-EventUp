'use strict';

const express = require('express');
const router = express.Router();
const { requireUser, requireFieldsNewEvent } = require('../middlewares/auth');
const Event = require('../models/Event');
const User = require('../models/User');

router.get('/', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const events = await Event.find({ creator: _id });

    res.render('events/events', { events });
  } catch (error) {
    next(error);
  }
});

router.get('/new', requireUser, (req, res, next) => {
  const data = {
    message: req.flash('validation')
  };
  res.render('events/create-event', data);
});

router.post('/new', requireUser, requireFieldsNewEvent, async (req, res, next) => {
  const { title, description, address, date, time } = req.body;
  const event = { title, description, address, date, time };
  try {
    event.creator = req.session.currentUser._id;
    await Event.create(event);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/add', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    res.render('events/event-add', { event });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/add', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  // console.log(name);
  try {
    const participant = await User.findOne({ name });
    const event = await Event.findByIdAndUpdate(id, { $push: { participants: participant._id } });
    // console.log(participant);
    console.log(event);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
