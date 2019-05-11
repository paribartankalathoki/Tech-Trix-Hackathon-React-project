'use strict';

const userRoute = require('../routes/user.server.route'),
  userConfirmationRoute = require('../routes/user.confirmation.server.route'),
  loginRoute = require('../routes/login.server.route'),
  profileRoute = require('../routes/profile.server.route'),
  postRoute = require('../routes/post.server.route');

const routeHelper = app => {
  app.use('/api/users', userRoute);
  // app.use('/api/confirm/users', userConfirmationRoute);
  app.use('/api/login', loginRoute);
  app.use('/api/profiles', profileRoute);
  // app.use('/api/posts', postRoute);
};

module.exports = routeHelper;
