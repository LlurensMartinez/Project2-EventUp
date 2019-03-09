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
    const invitations = await Event.find({ participants: _id });
    const confirmations = await Event.find({ confirmations: _id });
    const rejections = await Event.find({ rejections: _id });
    res.render('events/events', { events, invitations, confirmations, rejections });
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
  const { title, description, address, dateEvent, time } = req.body;
  const date = new Date(`${dateEvent} ${time}`);
  const event = { title, description, address, date };
  try {
    event.creator = req.session.currentUser._id;
    await Event.create(event);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/confirmations/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('participants').populate('confirmations').populate('rejections');
    res.render('events/confirmations', event);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/add', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const data = {
    messages: req.flash('validation')
  };

  try {
    const event = await Event.findById(id);
    res.render('events/event-add', { event, data });
  } catch (error) {
    next(error);
  }
});

router.post('/invitations/:id', requireUser, async (req, res, next) => {
  const { confirmation } = req.body;
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    if (confirmation === 'confirm') {
      await Event.findByIdAndUpdate(id, { $push: { confirmations: _id } }, { new: true });
      await Event.findByIdAndUpdate(id, { $pull: { participants: _id } }, { new: true });
      res.redirect('/events');
    } else {
      await Event.findByIdAndUpdate(id, { $push: { rejections: _id } }, { new: true });
      await Event.findByIdAndUpdate(id, { $pull: { participants: _id } }, { new: true });
      res.redirect('/events');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:id/add', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const participant = await User.findOne({ name });
    const user = await User.findById(_id).populate('friends');
    let myFriend = false;
    user.friends.forEach(friend => {
      if (friend.name === participant.name) {
        myFriend = true;
        return myFriend;
      }
    });
    if (!participant) {
      req.flash('validation', 'User does not exist');
      res.redirect(`/events/${id}/add`);
      return;
    }
    if (myFriend === true) {
      await Event.findByIdAndUpdate(id, { $push: { participants: participant._id } });
      res.redirect(`/events/${id}/add`);
      return;
    }
    req.flash('validation', 'User is not your friends');
    res.redirect(`/events/${id}/add`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
