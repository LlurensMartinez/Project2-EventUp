'use strict';

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'mbcloud',
  api_key: 719182332846221,
  api_secret: '00dr81CHwhhcHWb_-hLf798Cnhk'
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'event-up-events',
  allowedFormats: ['jpg', 'png']
});
const storageUsers = cloudinaryStorage({
  cloudinary,
  folder: 'event-up-users',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({
  storage,
  storageUsers,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return cb(null, false, new Error('Wrong file type uploaded'));
    }
    cb(null, true);
  }
});

module.exports = parser;
