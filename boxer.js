(function() {
  'use strict';

  var Hapi = require('hapi');
  var Good = require('good');
  var Mongoose = require('mongoose');
  var Confidence = require('confidence');
  var Q = require('q');

  // Begin server initialisation
  // This should all be done synchronously where possible
  // to avoid having dependencies uninitialised when the
  // server is started.

  console.log('Initialising Boxer...');

  // Initialise the config
  var store = new Confidence.Store(require('./config'));
  var config = store.get('/', { env: process.env.ENVIRONMENT });
  console.log('Loaded configuration [%s].', (typeof process.env.ENVIRONMENT === 'undefined' ? 'default' : process.env.ENVIRONMENT));

  // Initialise the server instance
  var server = new Hapi.Server(config.server.host, config.server.port);

  // Register Good with the server
  server.pack.register(Good, function(err) {
    if (err) {
      throw err; // Something bad happened...
    }

    // Register and define the authentication strategy
    server.pack.register(require('hapi-auth-cookie'), function (err) {
      if (err) {
        throw err; // Something bad happened...
      }

      server.auth.strategy('session', 'cookie', {
          password: 'secret',
          cookie: 'sid-example',
          redirectTo: '/login',
          isSecure: false
      });

      // Continue initialisation...
      server.log('info', 'Connecting to MongoDB...');
      Q.ninvoke(Mongoose, 'connect', 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.db)
      .then(function() {
        server.log('info', 'Connected to MongoDB.');

        Mongoose.connection.on('error', function(err) {
          server.log('error', 'MongoDB: ' + err.message);
          throw err;
        });
      })
      .then(function() {
        // Define the server routes
        server.route(require('./routes'));

        // Define the views
        // HTML files handled by handlebars
        server.views({
          engines:{
            'html': {
              module: require('handlebars'),
              compileMode: 'sync'
            }
          },
          compileMode: 'async',
          path: 'templates',
          layout: true,
          isCached: false
        });

        // Register the socket handler with the server
        server.pack.register(require('./lib/hapi-socket'), function(err) {
          if (err) {
            throw err;
          }
        });

        // Start the server
        server.start(function() {
          server.log('info', 'Server running at: ' + server.info.uri);
        });
      })
      .fail(function(err) {
        server.log('error', err.message);
        throw err;
      });
    });
  });
})();