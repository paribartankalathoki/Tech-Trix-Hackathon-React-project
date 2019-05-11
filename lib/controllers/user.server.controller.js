'use strict';

const hashOperator = require('../auth/hash.operator');

const messageConfig = require('../configs/api.message.config');

// const userConfirmationController = require('../controllers/user.confirmation.server.controller');

const mongodbProvider = require('../data/mongodb.provider.helper');

const User = require('../models/user.server.model');

const userInputValidator = require('../validators/user.server.validator');

const getUsers = async (req, res) => {
  try {
    const userQueryOpts = {};

    const userSortOpts = 'addedOn';

    const userProjectionOpts = '-_id email addedOn';

    const user = await mongodbProvider.getAllWithDocumentFieldsNoPagination(
      User,
      userQueryOpts,
      userProjectionOpts,
      userSortOpts
    );

    if (!user.length > 0)
      return res.status(404).json({ status: 404, message: messageConfig.userServerMessage.userNotFound });

    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not get user' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userQueryOpts = { _id: req.headers._id };

    const userProjectionOpts = '-_id email addedOn';

    const user = await mongodbProvider.findById(User, userQueryOpts, userProjectionOpts);
    if (!user) return res.status(404).json({ status: 404, data: messageConfig.userServerMessage.userNotFound });

    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not get user' });
  }
};

const saveUser = async (req, res) => {
  try {
    const { errors, isValid } = userInputValidator.validateUserRegistartionInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, message: errors });
    }

    const usernameQueryOpts = { username: req.body.username };

    const checkUsername = await mongodbProvider.findOne(User, usernameQueryOpts);
    if (checkUsername)
      return res.status(409).json({ status: 409, message: messageConfig.userServerMessage.usernameInUse });

    const emailQueryOpts = { email: req.body.email };

    const checkEmail = await mongodbProvider.findOne(User, emailQueryOpts);
    if (checkEmail)
      return res.status(409).json({ status: 409, message: messageConfig.userServerMessage.userAlreadyExist });

    const salt = await hashOperator.generateSalt(),
      encryptedPassword = await hashOperator.hashPassword(req.body.password, salt);

    const newUserData = new User({
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword
    });

    await mongodbProvider.saveDocument(newUserData);

    // userConfirmationController.sendEmailToUser(newUserData._id, newUserData.username, newUserData.email);

    res.status(200).json({ status: 200, message: messageConfig.userServerMessage.userSaved });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not save user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { errors, isValid } = userInputValidator.validateUserUpdateInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, message: errors });
    }

    const userQueryOpts = { _id: req.headers._id };

    const checkUser = await mongodbProvider.findById(User, userQueryOpts);
    if (!checkUser) return res.status(404).json({ status: 404, message: messageConfig.userServerMessage.userNotFound });

    const updateUserData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      mobilenumber: req.body.message,
      address: req.body.address,
      updatedOn: new Date()
    };

    await mongodbProvider.updateDocument(User, userQueryOpts, updateUserData);

    res.status(200).json({ status: 200, message: messageConfig.userServerMessage.userUpdated });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not update user' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { errors, isValid } = userInputValidator.validateUserPasswordChangeInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, message: errors });
    }

    const userQueryOpts = { _id: req.headers._id };

    const checkUser = await mongodbProvider.findById(User, userQueryOpts);
    if (!checkUser) return res.status(404).json({ status: 200, message: messageConfig.userServerMessage.userNotFound });

    const salt = await hashOperator.generateSalt(),
      encryptePassword = await hashOperator.hashPassword(req.body.password, salt);

    const updatePasswordData = {
      password: encryptePassword
    };

    await mongodbProvider.updateDocument(User, userQueryOpts, updatePasswordData);

    res.status(200).json({ status: 200, message: messageConfig.userServerMessage.passwordChanged });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ status: 500, message: 'Please try agin. Could not change password' });
  }
};

const deactivateUser = async (req, res) => {
  try {
    let userQueryOpts = { _id: req.headers._id };

    let checkUser = await mongodbProvider.findById(User, userQueryOpts);
    if (!checkUser) return res.status(404).json({ status: 200, message: messageConfig.userServerMessage.userNotFound });

    const deactivateUserData = {
      active: false,
      deactivatedOn: new Date()
    };

    await mongodbProvider.updateDocument(User, userQueryOpts, deactivateUserData);

    res.status(200).json({ message: messageConfig.userServerMessage.userDeactivated });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not delete user' });
  }
};

module.exports = { getUsers, getUserById, saveUser, updateUser, changePassword, deactivateUser };
