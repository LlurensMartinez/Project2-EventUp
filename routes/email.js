const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
  res.render('email/email');
});

router.post('/', (req, res, next) => {
  let { message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ironhackeventup@gmail.com',
      pass: 'ironhack'
    }
  });
  transporter.sendMail({
    from: '"My Awesome Project 👻" <ironhackeventup@gmail.com>',
    to: '4esoquevedoi@gmail.com',
    subject: 'hello FLORCIIIIIITA',
    text: message,
    html: `<b>${message}</b>`
  })
    .then(result => console.log(result))
    .catch(error => console.log(error));
});
module.exports = router;
