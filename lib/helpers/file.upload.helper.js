'use strict';

const messageConfig = require('../configs/api.message.config');

const path = require('path'),
  multer = require('multer');

const fileuploadHelper = targetFolder => {
  const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/' + targetFolder),
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
  });

  const checkFileType = (req, file, cb) => {
    const fileType = /jpeg|jpg|png/;
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);

    return cb(messageConfig.fileUploadHelperMessage.validationErrorMessage.invalidFileFormat);
  };

  return {
    upload: multer({
      storage: storage,
      limits: { fileSize: 1000000 },
      fileFilter: checkFileType
    })
  };
};

module.exports = fileuploadHelper;
