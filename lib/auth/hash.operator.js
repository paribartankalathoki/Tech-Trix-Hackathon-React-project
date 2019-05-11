'use strict';

const hasherConfig = require('../configs/bcrypt.hash.config');

const crypto = require('crypto'),
  bcrypt = require('bcrypt');

const generateSalt = () => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(hasherConfig.saltRounds, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
};

const hashPassword = (inputPassword, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(inputPassword, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

const comparePassword = (inputPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, hashedPassword, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};

const generateRandomBytes = length => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        resolve(salt.toString('hex').substring(0, length));
      }
    });
  });
};

module.exports = {
  generateSalt,
  hashPassword,
  comparePassword,
  generateRandomBytes
};
