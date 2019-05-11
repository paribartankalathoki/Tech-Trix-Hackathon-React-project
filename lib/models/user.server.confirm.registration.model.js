'use strict';

const mongoose = require('mongoose');

const userRegistrationConfirmationTokenSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    trim: true
  },
  confirmationToken: {
    type: String,
    trim: true
  },
  addedOn: {
    type: Date,
    default: Date.now
  },
  expiresOn: {
    type: Date
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserRegistrationConfirmationToken', userRegistrationConfirmationTokenSchema);
