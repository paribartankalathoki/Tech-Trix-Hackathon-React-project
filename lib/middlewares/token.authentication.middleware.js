'use strict';

const messageConfig = require('../configs/api.message.config');

const mongodbProvider = require('../data/mongodb.provider.helper');

const jwtTokenHelper = require('../helpers/jwt.token.helper');

const User = require('../models/user.server.model');

const tokenAuthenication = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-auth-token'] || req.headers.authorization;

  if (!token)
    return res.status(401).json({
      message: messageConfig.tokenAuthenticationMessage.tokenNotFound
    });

  try {
    const decoded = await jwtTokenHelper.jwtTokenVerifier(token);

    req.headers = decoded;

    const userQueryOts = { _id: req.headers._id, active: true };

    const checkUser = await mongodbProvider.findOne(User, userQueryOts);
    if (!checkUser)
      return res.status(404).json({ status: 404, message: messageConfig.tokenAuthenticationMessage.userNotFound });

    next();
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: messageConfig.tokenAuthenticationMessage.validationErrorMessage.invalidToken });
  }
};

module.exports = { tokenAuthenication };
