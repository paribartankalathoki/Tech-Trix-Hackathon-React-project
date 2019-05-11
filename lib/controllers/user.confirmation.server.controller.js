'use strict';

const messageConfig = require('../configs/api.message.config');

const monogdbProvider = require('../data/mongodb.provider.helper');

const hashOperator = require('../auth/hash.operator');

const emailSender = require('../helpers/email.service.provider.helper');

const UserRegistrationConfirmationToken = require('../models/user.server.confirm.registration.model');

const confirmUserRegistration = async (req, res) => {
  try {
    const token = req.params.userConfirmationToken;
    if (!token)
      return res.status(404).json({ status: 404, message: messageConfig.userConfirmationMessage.tokenNotFound });

    const tokenQueryOpts = {
      confirmationToken: token
    };

    const checkTokenExists = await monogdbProvider.findOne(UserRegistrationConfirmationToken, tokenQueryOpts);

    if (!checkTokenExists)
      return res.status(404).json({ status: 404, message: messageConfig.userConfirmationMessage.tokenNotFound });

    if (checkTokenExists.confirmed)
      return res.status(400).json({
        status: 400,
        message: messageConfig.userConfirmationMessage.validationErrorMessage.userAlreadyVerified
      });

    const currentDate = new Date();

    if (!checkTokenExists.expiresOn > currentDate)
      return res
        .status(400)
        .json({ status: 400, message: messageConfig.userConfirmationMessage.validationErrorMessage.tokenExpired });

    const userQueryOpts = {
      userID: checkTokenExists.userID
    };

    const userConfirmData = {
      confrimed: true
    };

    await monogdbProvider.updateDocument(UserRegistrationConfirmationToken, userQueryOpts, userConfirmData);

    res.status(200).json({ status: 200, message: messageConfig.userConfirmationMessage.userConfirmed });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not confirm user registration' });
  }
};

const saveUserConfirmationToken = async (token, userID) => {
  try {
    const currentDate = new Date();

    const expirationDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);

    const newTokenData = new UserRegistrationConfirmationToken({
      userId: userID,
      confirmationToken: token,
      expiresOn: expirationDate
    });

    await monogdbProvider.saveDocument(newTokenData);

    res.status(200).json({ status: 200, message: messageConfig.userConfirmationMessage.tokenSaved });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not save confirmation token' });
  }
};

const sendEmailToUser = async (userID, userName, userEmail, res, next) => {
  try {
    const token = hashOperator.generateRandomBytes(36);

    saveUserConfirmationToken(token, userID);

    const mailOptions = emailSender.sendEmailWithoutAttachment({
      name: userName,
      email: userEmail,
      link: `http://${req.headers.host}/auth/verify?code=${token}&email=${user.email}`
    });

    await emailSender.emailServerConfiguration(mailOptions);

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not send email to user' });
  }
};

module.exports = {
  confirmUserRegistration,
  sendEmailToUser
};
