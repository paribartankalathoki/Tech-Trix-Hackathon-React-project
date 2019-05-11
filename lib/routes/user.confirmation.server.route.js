'use strict';

const userConfirmationController = require('../controllers/user.confirmation.server.controller');

const userConfirmationRouter = require('express').Router();

userConfirmationRouter
  .route('/:userConfirmationToken')
  /**
   * @api {get} /api/confirm/user Confirm user registration by clicking the registration link
   * @apiPermission public
   * @apiName confirmUserRegistration
   * @apiGroup confirmUserRegistration
   */
  .get(userConfirmationController.confirmUserRegistration);

module.exports = userConfirmationRouter;
