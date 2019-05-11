'use strict';

const userController = require('../controllers/user.server.controller');

const tokenAuthenticationMiddleware = require('../middlewares/token.authentication.middleware'),
  tokenAuthorizationMiddleware = require('../middlewares/token.authorization.middleware');

const userRouter = require('express').Router();

userRouter
  .route('/all')
  /**
   * @api {get} /api/users/ Get user information data
   * @apiPermission admin
   * @apiName getUsers
   * @apiGroup User
   *
   * @status Working
   */
  .get(
    tokenAuthenticationMiddleware.tokenAuthenication,
    tokenAuthorizationMiddleware.tokenAuthorization,
    userController.getUsers
  );

userRouter
  .route('/register')
  /**
   * @api {post} /api/users/register Post user information data
   * @apiPermission public
   * @apiName saveUser
   * @apiGroup User
   *
   * @apiParam {String} email    Mandatory   email address of the user.
   * @apiParam {String} password    Mandatory   password of the user.
   * @apiParam {String} userRole    Mandatory   role of the user in the system.
   *
   * @status Working
   */
  .post(userController.saveUser);

userRouter
  .route('/current')
  /**
   * @api {get} /api/users/current Get user information data
   * @apiPermission private
   * @apiName getUserById
   * @apiGroup User
   *
   * @status Working
   */
  .get(tokenAuthenticationMiddleware.tokenAuthenication, userController.getUserById)
  /**
   * @api {put} /api/users/current Put user information data
   * @apiPermission private
   * @apiName updateUser
   * @apiGroup User
   *
   * @apiParam {String} firstname    Mandatory   firstname of the user.
   * @apiParam {String} lastname    Mandatory   lastname of the user.
   * @apiParam {String} gender    Mandatory   gender of the user.
   * @apiParam {String} mobilenumber    Mandatory   mobilenumber of the user.
   * @apiParam {String} address    Mandatory   address of the user.
   *
   * @status Working
   */
  .put(tokenAuthenticationMiddleware.tokenAuthenication, userController.updateUser);

userRouter
  .route('/current/password')
  /**
   * @api {put} /api/users/current/password Put user information data
   * @apiPermission private
   * @apiName changePassword
   * @apiGroup User
   *
   * @apiParam {String} password    Mandatory   new password of the user.
   *
   * @status Working
   */
  .put(tokenAuthenticationMiddleware.tokenAuthenication, userController.changePassword);

userRouter
  .route('/current/deactivate')
  /**
   * @api {patch} /api/users/current/deactivate Patch user information data
   * @apiPermission private
   * @apiName deactivateUser
   * @apiGroup User
   *
   * @status Working
   */
  .patch(tokenAuthenticationMiddleware.tokenAuthenication, userController.deactivateUser);

module.exports = userRouter;
