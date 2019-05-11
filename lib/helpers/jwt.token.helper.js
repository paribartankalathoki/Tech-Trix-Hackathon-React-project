'use strict';

const tokenConfig = require('../configs/token.config');

const jwt = require('jsonwebtoken');

const jwtTokenGenerator = payload => {
  const token = jwt.sign(payload, 'jwtSecret', {
    issuer: payload._id.toString(),
    expiresIn: tokenConfig.expirationTime,
    algorithm: tokenConfig.hashAlgorithm
  });

  return token;
};

const jwtTokenVerifier = token => {
  const verify = jwt.verify(token,'jwtSecret', {
    algorithm: tokenConfig.hashAlgorithm
  });

  return verify;
};

module.exports = { jwtTokenGenerator, jwtTokenVerifier };
