'use strict';

const http = require('http'),
  app = require('./index'),
  server = http.createServer(app),
  port = process.env.PORT || 5000;

let nodeServer = function() {
  let self = this;

  self.setupVariables = () => {
    self.port = port;
  };

  self.start = () => {
    app.set('portNumber', port);

    server.listen(self.port, () => {
      console.log(`Server started on ${self.port} at ${new Date()} `);
    });
  };
};

let application = new nodeServer();
application.setupVariables();
application.start();

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
