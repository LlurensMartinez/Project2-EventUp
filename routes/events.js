'use strict';

const express = require('express');
const router = express.Router();
const { requireUser, requireFieldsNewEvent } = require('../middlewares/auth');
const Event = require('../models/Event');
const User = require('../models/User');
const moment = require('moment');
const data = require('../helpers/email');

const parser = require('../helpers/file-upload');
const axios = require('axios');

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

router.post('/new', requireUser, parser.single('image'), requireFieldsNewEvent, async (req, res, next) => {
  const { title, description, address, dateEvent, time } = req.body;
  const dateModify = moment(new Date(`${dateEvent} ${time}`)).format('dddd, DD/MM/YYYY, h:mm a');
  const date = dateModify;

  let image = 'https://res.cloudinary.com/mbcloud/image/upload/v1552206295/event-up-events/party.png';
  if (req.file !== undefined) {
    image = req.file.url;
  }
  const event = {
    title,
    description,
    address,
    date,
    imageUrl: image
  };
  try {
    event.creator = req.session.currentUser._id;
    await Event.create(event);
    res.redirect('/events');
    return;
  } catch (error) {
    next(error);
  }
});

router.get('/info/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    const address = encodeURIComponent(event.address);
    const axiosCall = await axios(`https://api.opencagedata.com/geocode/v1/geojson?q=${address}&key=a13d1aa3e5c04193a98708915bca111a`);
    const coordinates = {
      longitude: axiosCall.data.features[0].geometry.coordinates[0],
      latitude: axiosCall.data.features[0].geometry.coordinates[1]
    };
    res.render('events/information', { coordinates, event });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).render('not-found');
    } else {
      res.status(500).render('error');
    }
  }
});

router.get('/confirmations/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('participants').populate('confirmations').populate('rejections');
    res.render('events/confirmations', event);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).render('not-found');
    } else {
      res.status(500).render('error');
    }
  }
});

router.get('/:id/add', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const data = {
    messages: req.flash('validation')
  };

  try {
    const event = await Event.findById(id).populate('participants');
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
      await Event.findByIdAndUpdate(id, { $push: { confirmations: _id } });
    } else {
      await Event.findByIdAndUpdate(id, { $push: { rejections: _id } });
    }
    await Event.findByIdAndUpdate(id, { $pull: { participants: _id } });
    res.redirect('/events');
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).render('not-found');
    } else {
      res.status(500).render('error');
    }
  }
});

router.post('/:id/add', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { _id } = req.session.currentUser;

  if (name === req.session.currentUser.name) {
    req.flash('validation', 'You can not invite youserlf');

    res.redirect(`/events/${id}/add`);
  }
  try {
    const participant = await User.findOne({ name });
    const user = await User.findById(_id).populate('friends');
    const event = await Event.findById(id).populate('participants');
    let myFriend = false;
    let isInvited = false;
    if (!participant) {
      req.flash('validation', 'User does not exist');
      res.redirect(`/events/${id}/add`);
      return;
    }
    user.friends.forEach(friend => {
      if (friend.name === participant.name) {
        myFriend = true;
        return myFriend;
      }
    });
    event.participants.forEach(friend => {
      if (friend.name === participant.name) {
        isInvited = true;
        return isInvited;
      }
    });

    if (!participant) {
      req.flash('validation', 'User does not exist');
      res.redirect(`/events/${id}/add`);
      return;
    }
    if (myFriend && !isInvited) {
      await Event.findByIdAndUpdate(id, { $push: { participants: participant._id } });
      data.sendEmail(participant.email);
      res.redirect(`/events/${id}/add`);
      return;
    }
    req.flash('validation', 'User is already invited or not your friend');
    res.redirect(`/events/${id}/add`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
