'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  gender: {
    type: String
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    trim: true
  },
  mobilenumber: {
    type: String,
    trim: true
  },
  userRole: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true
  },
  addedOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date
  },
  deactivatedOn: {
    type: Date
  },
  blocked: {
    type: Boolean,
    default: false
  },
  blockedBy: {
    type: String,
    trim: true
  },
  blockedOn: {
    type: Date
  },
  reactivatedOn: {
    type: Date
  }
});

module.exports = mongoose.model('User', userSchema);
