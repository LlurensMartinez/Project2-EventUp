const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/friends', async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      var friend = await User.findOne({ name });
    }
    res.render('user/friends', { friend });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
