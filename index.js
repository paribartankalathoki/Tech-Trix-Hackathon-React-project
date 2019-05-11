'use strict';

const passportAuthentication = require('./lib/auth/passport.authentication');

const databaseConnector = require('./lib/helpers/database.connector.helper');

const routeHelper = require('./lib/helpers/route.helper');

const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('./public'));

app.use(passport.initialize());
app.use(passport.session());

databaseConnector(app);
routeHelper(app);
passportAuthentication(passport);

module.exports = app;
