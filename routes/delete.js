const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { requireUser } = require('../middlewares/auth');

router.post('/comment/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;

  try {
    const event = await Event.findOneAndUpdate({ 'comments._id': id }, { $pull: { comments: { _id: id } } }, { new: true });
    res.redirect(`/events/info/${event._id}`);
  } catch (error) {
    next(error);
  }
});
router.post('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.redirect('/events');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
