const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.redirect('/events');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
