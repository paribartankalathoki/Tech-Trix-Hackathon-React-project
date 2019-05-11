'use strict';

const messageConfig = require('../configs/api.message.config');

const mongodbProvider = require('../data/mongodb.provider.helper');

const Post = require('../models/post.server.model');

const getPosts = async (req, res) => {
  try {
    const postQueryOpts = { active: true };

    const postSortOpts = 'addedOn';

    const post = await mongodbProvider.getAllWithoutFieldsPopulationNoPagination(Post, postQueryOpts, postSortOpts);
    if (!post.length > 0)
      return res.status(404).json({ status: 404, message: messageConfig.postServerMessage.postNotFound });

    res.status(200).json({ status: 200, data: post });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not get post' });
  }
};

const getPostById = async (req, res) => {
  try {
    const postQueryOpts = req.params.postId;

    const postProjectionOpts = '';

    const post = await mongodbProvider.findById(Post, postQueryOpts, postProjectionOpts);
    if (!post) return res.status(404).json({ status: 404, message: messageConfig.postServerMessage.postNotFound });

    res.status(200).json({ status: 200, data: post });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not get post' });
  }
};

const createPost = async (req, res) => {
  try {
    const newPostData = new Post({
      title: req.body.title,
      description: req.body.description
    });

    await mongodbProvider.saveDocument(newPostData);

    res.status(200).json({ status: 200, message: messageConfig.postServerMessage.postSaved });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not create post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const checkPostExistQueryOpts = req.params.postId;

    const checkPostExist = await mongodbProvider.findById(checkPostExistQueryOpts);
    if (!checkPostExist)
      return res.status(404).json({ status: 404, message: messageConfig.postServerMessage.postNotFound });

    //check ownership of profile for the authenticated user
    const verifyUserQueryOpts = { _id: req.params.postId, addedBy: req.header._id };

    const verifyUser = await mongodbProvider.findById(Profile, verifyUserQueryOpts);
    if (!verifyUser)
      return res
        .status(401)
        .json({ status: 401, message: messageConfig.profileServerMessage.validationErrorMessage.invalidUser });

    const updatePostData = {
      title: req.body.title,
      description: req.body.description,
      updatedOn: new Date()
    };

    await mongodbProvider.updateDocument(Post, checkPostExistQueryOpts, updatePostData);

    res.status(200).json({ status: 200, message: messageConfig.postServerMessage.postUpdated });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not update post' });
  }
};

const deactivatePost = async (req, res) => {
  try {
    const checkPostExistQueryOpts = req.params.postId;

    const checkPostExist = await mongodbProvider.findById(checkPostExistQueryOpts);
    if (!checkPostExist)
      return res.status(404).json({ status: 404, message: messageConfig.postServerMessage.postNotFound });

    //check ownership of profile for the authenticated user
    const verifyUserQueryOpts = { _id: req.params.postId, addedBy: req.header._id };

    const verifyUser = await mongodbProvider.findById(Profile, verifyUserQueryOpts);
    if (!verifyUser)
      return res
        .status(401)
        .json({ status: 401, message: messageConfig.profileServerMessage.validationErrorMessage.invalidUser });

    const deactivatePostData = {
      active: faslse,
      deactivatedOn: new Date()
    };

    await mongodbProvider.updateDocument(Post, checkPostExistQueryOpts, deactivatePostData);

    res.status(200).json({ status: 200, message: messageConfig.postServerMessage.postDeactivated });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not delete post' });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deactivatePost };
