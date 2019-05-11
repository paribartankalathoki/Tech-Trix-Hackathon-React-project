'use strict';

const emailConfig = require('../configs/email.service.config');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailConfig.email,
    pass: emailConfig.password
  }
});

const sendEmailWithoutAttachment = mailData => {
  const mailTemplate = {
    from: emailConfig.email,
    to: `${mailData.email}`,
    subject: 'Welcome to I Love Books!',
    text: 'Thank you for signing up to I Love Books',
    html: `
    <p><b> Hey ${mailData.email} </b></p>
    <br/>
    <p> Click the link below to verify your account </p>
    <p> <a href='${mailData.link}'target="_blank"> User verification link </a></p> 
    <br/>
    <p> Regards,</p> <p> I Love Books.</p>
    <br/>
    Thanks!!
    &copy; ${new Date().getFullYear()}`
  };

  return mailTemplate;
};

const emailServerConfiguration = mailOptions => {
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent to the user');
    }
  });
};

module.exports = { sendEmailWithoutAttachment, emailServerConfiguration };
