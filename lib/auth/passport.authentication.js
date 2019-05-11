'use strict';

const hashOperator = require('./hash.operator');

const messageConfig = require('../configs/api.message.config');

const mongodbProvider = require('../data/mongodb.provider.helper');

const User = require('../models/user.server.model');

const userInputValidator = require('../validators/login.server.validator');

const LocalStrategy = require('passport-local').Strategy;

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          let userQueryOpts = {
            $or: [{ email: email }, { username: email }]
          };

          const checkUser = await mongodbProvider.findOne(User, userQueryOpts);
          if (!checkUser)
            return done(
              {
                message: messageConfig.authenticationMessage.validationErrorMessage.invalidCredential
              },
              null,
              false
            );

          userQueryOpts = {
            $or: [{ email: email }, { username: email }],
            blocked: true
          };

          const checkUserBlockStatus = await mongodbProvider.findOne(User, userQueryOpts);
          if (checkUserBlockStatus)
            return done(null, false, {
              message: messageConfig.authenticationMessage.validationErrorMessage.userBlocked
            });

          const verifyPassword = await hashOperator.comparePassword(password, checkUser.password);
          if (!verifyPassword)
            return done(
              {
                message: messageConfig.authenticationMessage.validationErrorMessage.invalidCredential
              },
              null,
              false
            );

          return done(null, email);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

// module.exports = { passportAuth };
