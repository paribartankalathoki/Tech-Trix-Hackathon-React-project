'use strict';

const dbConfig = require('../configs/database.config');

const mongoose = require('mongoose');

const databaseConnector = app => {
  let url = '';

  switch (app.get('env')) {
    case 'development':
      url = `mongodb+srv://${dbConfig.development.username}:${dbConfig.development.password}@${
        dbConfig.development.host
      }/${dbConfig.development.dbName}`;
      break;

    case 'production':
      url = `mongodb+srv://${dbConfig.production.username}:${dbConfig.production.password}@${
        dbConfig.production.host
      }/${dbConfig.production.dbName}`;
      break;
  }

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      // console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.log(`Unable to connect to MongoDB ${err}`);
    });
};

module.exports = databaseConnector;

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected due to app termination');
    process.exit(0);
  });
});
