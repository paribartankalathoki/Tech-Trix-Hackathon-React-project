'use strict';

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    name: {
      type: String
    },
    mimetype: {
      type: String
    },
    path: {
      type: String
    }
  },
  location: {
    type: String,
    required: true
  },
  biography: {
    type: String
  },
  education: [
    {
      college: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      discipline: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      description: {
        type: String
      }
    }
  ],
  socialMedia: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = mongoose.model('Profile', profileSchema);
