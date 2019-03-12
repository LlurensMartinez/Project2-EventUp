'use strict';
const nodemailer = require('nodemailer');

const data = {

  sendEmail (email) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ironhackeventup@gmail.com',
        pass: 'ironhack'
      }
    });
    transporter.sendMail({
      from: '"EVENT UP" <ironhackeventup@gmail.com>',
      to: email,
      subject: 'New Event!!',
      text: 'You have been invited to an event!!',
      html: `<b></b>`
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }
};

module.exports = data;
