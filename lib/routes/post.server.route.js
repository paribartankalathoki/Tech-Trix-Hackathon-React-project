'use strict';

const postController = require('../controllers/post.server.controller');

const tokenAuthenticationMiddleware = require('../middlewares/token.authentication.middleware'),
  tokenAuthorizationMiddleware = require('../middlewares/token.authorization.middleware');

const postRouter = require('express').Router();

postRouter
  .route('/all')
  /**
   * @api {get} /api/post/all Get post information data
   * @apiPermission public
   * @apiName getPosts
   * @apiGroup Posts
   */
  .get(postController.getPosts);

postRouter
  .route('/')
  /**
   * @api {post} /api/post/ Post post information data
   * @apiPermission private
   * @apiName createPost
   * @apiGroup Posts
   *
   * @apiParam {String} title    Mandatory   title of the post.
   * @apiParam {String} description    Mandatory   description of the post.
   */
  .post(tokenAuthenticationMiddleware.tokenAuthenication, postController.createPost);

postRouter
  .route('/:postId')
  /**
   * @api {get} /api/post/:postId Get post information data
   * @apiPermission public
   * @apiName getPostById
   * @apiGroup Posts
   */
  .get(postController.getPostById)
  /**
   * @api {put} /api/post/ Put post information data
   * @apiPermission private
   * @apiName updatePost
   * @apiGroup Posts
   *
   * @apiParam {String} title    Mandatory   title of the post.
   * @apiParam {String} description    Mandatory   description of the post.
   */
  .put(tokenAuthenticationMiddleware.tokenAuthenication, postController.updatePost);

postRouter
  .route('/deactivate/:postId')
  /**
   * @api {get} /api/post/:postId Put post information data
   * @apiPermission private
   * @apiName getPostById
   * @apiGroup Posts
   */
  .put(tokenAuthenticationMiddleware.tokenAuthenication, postController.deactivatePost);
  
module.exports = postRouter;
