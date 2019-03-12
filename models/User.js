'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [{
    type: ObjectId,
    ref: 'User'
  }],
  imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/mbcloud/image/upload/v1552231082/event-up-events/clmegdwiztitevgptcwi.png'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
