const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const { requireUser } = require('../middlewares/auth');

router.get('/', requireUser, async (req, res, next) => {
  // const { _id } = req.session.currentUser;
  // try {
  //   const messages = await Message.find({participant: _id})
  // }
  res.render('messages/messages');
});

router.get('/new', (req, res, next) => {
  res.render('messages/message-new');
});

router.post('/new', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { name, body } = req.body;
  try {
    const participant = await User.findOne({ name });
    const messageInfo = {
      body: body,
      participant: participant,
      creator: _id
    };
    const message = await Message.create(messageInfo);
    console.log(message);
    res.redirect('/messages');
  } catch (error) {
    next(error);
  }
});
module.exports = router;
