const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireUser, requireFieldsLogin } = require('../middlewares/auth');

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

router.get('/edit', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render('user/profile', user);
  } catch (error) {
    next(error);
  }
});

router.post('/edit', requireUser, parser.single('image'), requireFieldsLogin, async (req, res, next) => {
  const { name, username, mail, password } = req.body;
  let { _id } = req.session.currentUser;
  let { imageUrl } = req.session.currentUser;
  // let image = 'https://res.cloudinary.com/mbcloud/image/upload/v1552227481/event-up-users/userDefault.png';
  if (req.file !== undefined) {
    imageUrl = req.file.url;
  }
  const user = { name, username, mail, password, imageUrl: imageUrl };
  try {
    const userModify = await User.findByIdAndUpdate(_id, user, { new: true });
    req.session.currentUser = userModify;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/info/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render('user/info', user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
