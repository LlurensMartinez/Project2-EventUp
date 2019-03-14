'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  creator: {
    type: ObjectId,
    required: true
  },
  comments: [{
    commentCreator: {
      type: ObjectId,
      ref: 'User',
      require: true
    },
    message: {
      type: String
    }
  }],
  valuation: {
    type: Number,
    default: 0
  },
  usersLike: [{
    user: {
      type: ObjectId,
      ref: 'User',
      require: true
    }
  }],
  participants: [{
    type: ObjectId,
    ref: 'User'
  }],
  rejections: [{
    type: ObjectId,
    ref: 'User'
  }],
  confirmations: [{
    type: ObjectId,
    ref: 'User'
  }],
  imageUrl: {
    type: String
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
