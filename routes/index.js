var Handlers = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: false
      }
    }
  }, {
    method: 'GET',
    path: '/',
    config: Handlers.home
  }, {
    method: ['GET', 'POST'],
    path: '/login',
    config: Handlers.login
  }, {
    method: 'GET',
    path: '/logout',
    config: Handlers.logout
  }
];