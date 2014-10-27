var Handlers = require('./handlers');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: Handlers.home
  }
];