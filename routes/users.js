const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireUser } = require('../middlewares/auth');

const parser = require('../helpers/file-upload');

/* GET users listing. */
router.get('/friends', requireUser, async (req, res, next) => {
  const { name } = req.query;
  const { _id } = req.session.currentUser;
  const data = {
    messages: req.flash('validation')
  };
  try {
    if (name) {
      var friend = await User.findOne({ name });
    }
    const myFriends = await User.findById(_id).populate('friends');
    res.render('user/friends', { friend, myFriends, data });
  } catch (error) {
    next(error);
  }
});

router.post('/friends', requireUser, async (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.session.currentUser;
  try {
    const friend = await User.findOne({ name });
    const user = await User.findById(_id).populate('friends');
    var checked = false;
    user.friends.forEach(myFriend => {
      if (myFriend.name === friend.name) {
        checked = true;
        return checked;
      }
    });
    if (!checked && _id != friend._id) {
      await User.findByIdAndUpdate({ _id }, { $push: { friends: friend } });
      res.redirect('/users/friends');
      return;
    }
    req.flash('validation', 'Thats already your friend');
    res.redirect('/users/friends');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render('user/profile', user);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireUser, parser.single('image'), async (req, res, next) => {
  const { _id, name, username, mail, password } = req.body;
  const user = { name, username, mail, password, imageUrl: req.file.url };
  try {
    await User.findByIdAndUpdate(_id, user);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
