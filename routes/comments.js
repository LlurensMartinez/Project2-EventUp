'use strict';

const express = require('express');
const router = express.Router();
const { requireUser } = require('../middlewares/auth');
const Event = require('../models/Event');

router.post('/likes/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  const userLike = {
    user: _id
  };
  try {
    const event = await Event.findById(id);
    let likes = event.valuation;
    let state = false;
    event.usersLike.forEach(user => {
      if (user.user.toString() === _id) {
        state = true;
      }
    });
    if (state) {
      likes -= 1;
      await Event.findByIdAndUpdate(id, { valuation: likes }, { new: true });
      await Event.findByIdAndUpdate(id, { $pull: { usersLike: userLike } }, { new: true });
    }
    if (!state) {
      likes += 1;
      await Event.findByIdAndUpdate(id, { valuation: likes }, { new: true });
      await Event.findByIdAndUpdate(id, { $push: { usersLike: userLike } }, { new: true });
    }
    res.redirect(`/events/info/${id}`);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  const { message } = req.body;
  const comment = {
    commentCreator: _id,
    message: message
  };
  try {
    const event = await Event.findByIdAndUpdate(id, { $push: { comments: comment } });
    console.log(event);
    res.redirect(`/events/info/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
