const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireUser } = require('../middlewares/auth');

/* GET users listing. */
router.get('/friends', requireUser, async (req, res, next) => {
  const { name } = req.query;
  const { _id } = req.session.currentUser;
  try {
    if (name) {
      var friend = await User.findOne({ name });
    }
    const myFriends = await User.findById(_id).populate('friends');
    console.log(myFriends);
    res.render('user/friends', { friend, myFriends });
  } catch (error) {
    next(error);
  }
});

router.post('/friends', requireUser, async (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const friend = await User.findOne({ name });
    await User.findByIdAndUpdate({ _id }, { $push: { friends: friend } });
    res.redirect('/users/friends');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
