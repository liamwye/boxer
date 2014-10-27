var Socket = require('socket.io');

// Publically accessable variable...
var io;

exports.register = function(plugin, options, next) {
  plugin.log('info', 'Initialising Socket.IO...');

  // Bind the socket to the server
  io = Socket.listen(plugin.servers[0].listener);

  // Register some basic log handlers
  io.sockets.on('connection', function(socket) {
    plugin.log('info', 'Socket.IO connection established [' + socket.id + '].');

    socket.on('message', function(message) {
      plugin.log('info', 'Socket.IO received message [' + socket.id + ']; ' + message);
    });

    socket.on('disconnect', function() {
      plugin.log('info', 'Socket.IO client disconnected [' + socket.id + '].');
    });

    // Return their session id
    socket.json.send({ session: socket.id });
  });

  plugin.log('info', 'Socket.IO initialisation complete.');

  next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};