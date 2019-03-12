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
    unique: true
  },
  password: {
    type: String,
    required: () => this.facebook
  },
  facebook: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    required: () => this.facebook
  },
  facebookId: {
    type: String,
    required: () => this.facebook
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
