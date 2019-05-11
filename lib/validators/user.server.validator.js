'use strict';

const messageConfig = require('../configs/api.message.config'),
  isEmpty = require('../configs/is-empty.config');

const Validator = require('validator');

const validateUserRegistartionInput = data => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.username, { min: 3, max: 20 }))
    errors.username = messageConfig.userServerMessage.validationErrorMessage.invalidUsername;

  if (Validator.isEmpty(data.username))
    errors.username = messageConfig.userServerMessage.validationErrorMessage.usernameRequired;

  if (!Validator.isEmail(data.email))
    errors.email = messageConfig.userServerMessage.validationErrorMessage.invalidEmail;

  if (Validator.isEmpty(data.email))
    errors.email = messageConfig.userServerMessage.validationErrorMessage.emailRequired;

  if (!Validator.isLength(data.password, { min: 8, max: 20 }))
    errors.password = messageConfig.userServerMessage.validationErrorMessage.weakPassword;

  if (Validator.isEmpty(data.password))
    errors.password = messageConfig.userServerMessage.validationErrorMessage.passwordRequired;

  if (!Validator.equals(data.confirmPassword, data.password))
    errors.confirmPassword = messageConfig.userServerMessage.validationErrorMessage.matchPassword;

  if (Validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = messageConfig.userServerMessage.validationErrorMessage.confirmPasswordRequired;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateUserUpdateInput = data => {
  const errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  if (Validator.isEmpty(data.firstname))
    errors.firstname = messageConfig.userServerMessage.validationErrorMessage.firstnameRequired;

  if (!Validator.isLength(data.firstname, { min: 3, max: 20 }))
    errors.firstname = messageConfig.userServerMessage.validationErrorMessage.invalidFirstname;

  if (Validator.isEmpty(data.lastname))
    errors.lastname = messageConfig.userServerMessage.validationErrorMessage.lastnameRequired;

  if (!Validator.isLength(data.lastname, { min: 3, max: 20 }))
    errors.lastname = messageConfig.userServerMessage.validationErrorMessage.invalidLastname;

  if (Validator.isEmpty(data.gender))
    errors.gender = messageConfig.userServerMessage.validationErrorMessage.genderRequired;

  if (!Validator.isLength(data.gender, { min: 3, max: 20 }))
    errors.gender = messageConfig.userServerMessage.validationErrorMessage.invalidGender;

  if (Validator.isEmpty(data.mobilenumber))
    errors.mobilenumber = messageConfig.userServerMessage.validationErrorMessage.mobilenumberRequired;

  if (!Validator.isLength(data.mobilenumber, { min: 8, max: 10 }))
    errors.mobilenumber = messageConfig.userServerMessage.validationErrorMessage.inavlideMobilenumber;

  if (Validator.isEmpty(data.address))
    errors.address = messageConfig.userServerMessage.validationErrorMessage.addressRequired;

  if (!Validator.isLength(data.address, { min: 3, max: 20 }))
    errors.address = messageConfig.userServerMessage.validationErrorMessage.invalidAddress;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateUserPasswordChangeInput = data => {
  const errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.password) ? data.confirmPassword : '';

  if (Validator.isEmpty(data.password))
    errors.password = messageConfig.userServerMessage.validationErrorMessage.passwordRequired;

  if (!Validator.isLength(data.password, { min: 8, max: 20 }))
    errors.password = messageConfig.userServerMessage.validationErrorMessage.weakPassword;

  if (Validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = messageConfig.userServerMessage.validationErrorMessage.confirmPasswordRequired;

  if (!Validator.equals(data.confirmPassword, data.password))
    errors.confirmPassword = messageConfig.userServerMessage.validationErrorMessage.matchPassword;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { validateUserRegistartionInput, validateUserUpdateInput, validateUserPasswordChangeInput };
