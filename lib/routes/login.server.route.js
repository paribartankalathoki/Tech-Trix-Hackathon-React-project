'use strict';

const loginController = require('../controllers/login.server.controller');

const loginRouter = require('express').Router(),
  passport = require('passport');

loginRouter
  .route('/')
  /**
   * @api {post} /api/login  Verify the user credentials i.e. username or email and password
   * @apiPermission public
   * @apiName passport.authenticate('local-login')
   * @apiGroup Login
   *
   * @apiParam {String} username/email  Mandatory username/email of the user
   * @apiParam {String} password Mandatory  password of the user
   */
  .post(passport.authenticate('local', { session: false }), loginController.loginUser);
// .post(loginController.loginUser);

module.exports = loginRouter;
