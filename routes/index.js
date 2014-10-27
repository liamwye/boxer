var Handlers = require('./handlers');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: Handlers.home
  },
  {
    method: 'GET',
    path: '/assets/{path*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: false
      }
    }
  }
];