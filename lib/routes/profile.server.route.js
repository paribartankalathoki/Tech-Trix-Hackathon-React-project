'use strict';

const profileController = require('../controllers/profile.server.controller');

const tokenAuthenticationMiddleware = require('../middlewares/token.authentication.middleware'),
  tokenAuthorizationMiddleware = require('../middlewares/token.authorization.middleware');

const fileUploadHelper = require('../helpers/file.upload.helper')('profileImages');

const profileRouter = require('express').Router();

profileRouter
  .route('/all')
  /**
   * @api {get} /api/profile/all Get profile information data
   * @apiPermission admin
   * @apiName getUsers
   * @apiGroup Profile
   *
   * @status Working
   */
  .get(
    tokenAuthenticationMiddleware.tokenAuthenication,
    tokenAuthorizationMiddleware.tokenAuthorization,
    profileController.getProfiles
  );

profileRouter
  .route('/')
  /**
   * @api {post} /api/profile/ Post profile information data
   * @apiPermission private
   * @apiName createProfile
   * @apiGroup Profile
   *
   * @apiParam {String} user    Mandatory   address of the user.
   * @apiParam {String} location    Mandatory   location of the user.
   * @apiParam {String} biography    Mandatory   biography of the user.
   * @apiParam {String} facebook    Mandatory   facebook profile of the user.
   * @apiParam {String} twitter    Mandatory   twitter profile of the user.
   * @apiParam {String} instagram    Mandatory   instagram profile of the user.
   *
   * @status Working
   */
  .post(tokenAuthenticationMiddleware.tokenAuthenication, profileController.createProfile);

profileRouter
  .route('/current')
  /**
   * @api {get} /api/profile/current Get profile information data
   * @apiPermission private
   * @apiName getProfileById
   * @apiGroup Profile
   *
   * @status Working
   */
  .get(tokenAuthenticationMiddleware.tokenAuthenication, profileController.getProfileById)
  /**
   * @api {put} /api/profile/current Put profile information data
   * @apiPermission private
   * @apiName createProfile
   * @apiGroup Profile
   *
   * @apiParam {String} location    Mandatory   location of the user.
   * @apiParam {String} biography    Mandatory   biography of the user.
   * @apiParam {String} facebook    Mandatory   facebook profile of the user.
   * @apiParam {String} twitter    Mandatory   twitter profile of the user.
   * @apiParam {String} instagram    Mandatory   instagram profile of the user.
   *
   * @status Working
   */
  .put(tokenAuthenticationMiddleware.tokenAuthenication, profileController.updateProfile);

profileRouter
  .route('/current/profilepicture')
  /**
   * @api {post} /api/profile/curretn/profilepicture Post profile information data
   * @apiPermission private
   * @apiName uploadProfilePicture
   * @apiGroup Profile
   *
   * @apiParam {File} profilpicture    Mandatory   profile picture of the user.
   *
   * @status Working
   */
  .post(
    fileUploadHelper.upload.single('image'),
    tokenAuthenticationMiddleware.tokenAuthenication,
    profileController.uploadProfilePicture
  );

profileRouter
  .route('/current/education')
  /**
   * @api {post} /api/profile/current/education Post user education data
   * @apiPermission private
   * @apiName saveEducation
   * @apiGroup Profile
   *
   * @apiParam {String} college    Mandatory   college attended by the user.
   * @apiParam {String} degree    Mandatory   degree applied by the user.
   * @apiParam {String} discipline    Mandatory   discipline of the user.
   * @apiParam {Date} from    Mandatory   date joined bye the user.
   * @apiParam {Date} to    Mandatory   date gradutaed by the user.
   * @apiParam {Boolean} to    Mandatory   Current status of the user.
   * @apiParam {String} to    Mandatory   Description by the user.
   *
   * @status Working
   */
  .post(tokenAuthenticationMiddleware.tokenAuthenication, profileController.saveEducation);

// profileRouter
//   .route('/current/education/:educationId')
/**
 * @api {post} /api/profile/education/:profileId Put user education data
 * @apiPermission private
 * @apiName updateEducation
 * @apiGroup Profile
 *
 * @apiParam {String} college    Mandatory   college attended by the user.
 * @apiParam {String} degree    Mandatory   degree applied by the user.
 * @apiParam {String} discipline    Mandatory   discipline of the user.
 * @apiParam {Date} from    Mandatory   date joined bye the user.
 * @apiParam {Date} to    Mandatory   date gradutaed by the user.
 * @apiParam {Boolean} to    Mandatory   Current status of the user.
 * @apiParam {String} to    Mandatory   Description by the user.
 *
 * @status Working
 */
// .put(tokenAuthenticationMiddleware.tokenAuthenication, profileController.updateEducation);

module.exports = profileRouter;
