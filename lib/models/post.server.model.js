'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
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
  }
});

module.exports = mongoose.model('Post', postSchema);
