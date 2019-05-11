'use strict';

const messageConfig = require('../configs/api.message.config'),
  isEmpty = require('../configs/is-empty.config');

const Validator = require('validator');

const validateUserLoginInput = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email))
    errors.email = messageConfig.userServerMessage.validationErrorMessage.invalidEmail;

  if (Validator.isEmpty(data.email))
    errors.email = messageConfig.userServerMessage.validationErrorMessage.emailRequired;

  if (!Validator.isLength(data.password, { min: 8, max: 20 }))
    errors.password = messageConfig.userServerMessage.validationErrorMessage.weakPassword;

  if (Validator.isEmpty(data.password))
    errors.password = messageConfig.userServerMessage.validationErrorMessage.passwordRequired;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { validateUserLoginInput };
