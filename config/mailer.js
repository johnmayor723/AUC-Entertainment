// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aucentertainmentpro@gmail.com', // replace with your Gmail
    pass: 'lzdfyyyuaqimosxm'       // app password (no spaces)
  }
});

module.exports = transporter;
