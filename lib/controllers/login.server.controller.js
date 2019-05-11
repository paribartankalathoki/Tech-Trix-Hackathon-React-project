'use strict';

const mongodbProvider = require('../data/mongodb.provider.helper');

const jwtTokenHelper = require('../helpers/jwt.token.helper');

const User = require('../models/user.server.model');

const loginUser = async (req, res) => {
  try {
    const userQueryOpts = {
      $or: [{ email: req.body.email }, { username: req.body.email }]
    };

    const checkUserStatus = await mongodbProvider.findOne(User, userQueryOpts);

    //Re-activate user on login
    if (checkUserStatus.active === false) {
      const updateUserData = {
        active: true,
        reactivatedOn: new Date()
      };

      await mongodbProvider.updateDocument(User, userQueryOpts, updateUserData);
    }

    const payload = {
      _id: checkUserStatus._id
    };

    const token = await jwtTokenHelper.jwtTokenGenerator(payload);

    res.status(200).json({ status: 200, token: token });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not login user' });
  }
};

module.exports = { loginUser };
