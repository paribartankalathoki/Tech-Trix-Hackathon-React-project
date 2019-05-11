'use strict';

const messageConfig = require('../configs/api.message.config');

const mongodbProvider = require('../data/mongodb.provider.helper');

const User = require('../models/user.server.model'),
  Profile = require('../models/profile.server.model');

const getProfiles = async (req, res) => {
  try {
    const profileQueryOpts = {};

    const profilePopulationPathOpts = 'user';

    const profilePopulationFieldOpts = ['username', 'firstname', 'lastname', 'image.path'];

    const profile = await mongodbProvider.getAllWithoutFieldsPopulationNoPagination(
      Profile,
      profileQueryOpts,
      profilePopulationPathOpts,
      profilePopulationFieldOpts
    );

    if (!profile.length > 0)
      return res.status(404).json({ status: 404, message: messageConfig.profileServerMessage.profileNotFound });

    res.status(200).json({ status: 200, data: profile });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not get user profile' });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profileQueryOpts = { user: req.headers._id };

    const profilePopulationPathOpts = 'user';

    const profilePopulationFieldOpts = ['username', 'firstname', 'lastname', 'image.path'];

    const profile = await mongodbProvider.getByIdFieldsPopulationNoPagination(
      Profile,
      profileQueryOpts,
      profilePopulationPathOpts,
      profilePopulationFieldOpts
    );
    if (!profile)
      return res.status(404).json({ status: 404, message: messageConfig.profileServerMessage.profileNotFound });

    res.status(200).json({ status: 200, data: profile });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not get user profile' });
  }
};

const createProfile = async (req, res) => {
  try {
    const userQueryOpts = { _id: req.headers._id };

    const user = await mongodbProvider.findById(User, userQueryOpts);
    if (!user) return res.status(404).json({ status: 404, message: messageConfig.userServerMessage.userNotFound });

    const newProfileData = new Profile({
      user: user,
      location: req.body.location,
      biography: req.body.biography,
      socialMedia: {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram
      }
    });

    await mongodbProvider.saveDocument(newProfileData);

    res.status(200).json({ status: 200, message: messageConfig.profileServerMessage.profileSaved });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not save user profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const checkProfileQueryOpts = { user: req.headers._id };

    const checkProfile = await mongodbProvider.findOne(Profile, checkProfileQueryOpts);
    if (!checkProfile)
      return res.status(404).json({ status: 404, message: messageConfig.profileServerMessage.profileNotFound });

    const updateProfileData = {
      location: req.body.location,
      biography: req.body.biography,
      socialMedia: {
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        instagram: req.body.instagram
      }
    };

    await mongodbProvider.updateDocument(Profile, checkProfileQueryOpts, updateProfileData);

    res.status(200).json({ status: 200, message: messageConfig.profileServerMessage.profileUpdated });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not update user profile' });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file)
      return res.status(404).json({ status: 404, message: messageConfig.fileUploadHelperMessage.imageNotSelected });

    const imageQueryOpts = { user: req.headers._id };

    const path = req.file.path;
    const newPath = path.substring(47);

    const newImageData = {
      image: { name: req.file.filename, mimetype: req.file.mimetype, path: newPath }
    };

    await mongodbProvider.updateDocument(Profile, imageQueryOpts, newImageData);

    res.status(200).json({ status: 200, message: messageConfig.fileUploadHelperMessage.imageSaved });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not upload image' });
  }
};

const saveEducation = async (req, res) => {
  try {
    const checkProfileQueryOpts = { user: req.headers._id };

    const checkProfile = await mongodbProvider.findOne(Profile, checkProfileQueryOpts);
    if (!checkProfile)
      return res.status(404).json({ status: 404, message: messageConfig.profileServerMessage.profileNotFound });

    const newEducationData = {
      education: [
        {
          college: req.body.college,
          degree: req.body.degree,
          discipline: req.body.discipline,
          from: req.body.from,
          to: req.body.to,
          description: req.body.description
        }
      ]
    };

    await mongodbProvider.saveToEmbeddedDocument(Profile, checkProfileQueryOpts, newEducationData);

    res.status(200).json({ status: 200, message: messageConfig.profileServerMessage.educationAdded });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, message: 'Please try again. Could not save user education' });
  }
};

// const updateEducation = async (req, res) => {
//   try {
//     const checkProfileQueryOpts = { user: req.headers._id };

//     const checkProfile = await mongodbProvider.findOne(Profile, checkProfileQueryOpts);
//     if (!checkProfile)
//       return res.status(404).json({ status: 404, message: messageConfig.profileServerMessage.profileNotFound });

//     console.log(req.params.educationId);
//     const checkEducationQueryOpts = { 'education._id': req.params.educationId };

//     const checkEducation = await mongodbProvider.findOne(Profile, checkEducationQueryOpts);
//     console.log(checkEducation);
//     if (!checkEducation)
//       return res.status(404).json({ status: 404, message: messageConfig.profileServerMessage.educationNotFound });

//     const newEducationData = {
//       education: {
//         college: req.body.college,
//         degree: req.body.degree,
//         discipline: req.body.discipline,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       }
//     };

//     await mongodbProvider.saveToEmbeddedDocument(Profile, checkProfileQueryOpts, newEducationData);

//     res.status(200).json({ status: 200, message: messageConfig.profileServerMessage.educationUpdated });
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({ status: 500, message: 'Please try again. Could not save user education' });
//   }
// };

// module.exports = { getProfiles, getProfileById, createProfile, updateProfile, saveEducation, updateEducation };
module.exports = { getProfiles, getProfileById, createProfile, updateProfile, uploadProfilePicture, saveEducation };
