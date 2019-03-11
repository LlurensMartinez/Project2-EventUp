'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  body: [{
    message: {
      type: String
    },
    messageCreator: {
      type: String,
      require: true
    },
    date: {
      type: Date
    }
  }],
  creator: {
    type: ObjectId,
    require: true,
    ref: 'User'
  },
  participant: {
    type: ObjectId,
    ref: 'User'
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
