'use strict';

const messageConfig = require('../configs/api.message.config');

const mongodbProvider = require('../data/mongodb.provider.helper');

const User = require('../models/user.server.model');

const tokenAuthorization = async (req, res, next) => {
  try {
    const userQueryOpts = { _id: req.headers._id, userRole: 'admin' };

    const isAdmin = await mongodbProvider.findOne(User, userQueryOpts);
    if (!isAdmin)
      return res
        .status(403)
        .json({ status: 403, message: messageConfig.tokenAuthenticationMessage.validationErrorMessage.accessDenied });

    next();
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: messageConfig.tokenAuthenticationMessage.validationErrorMessage.invalidToken });
  }
};

module.exports = { tokenAuthorization };
