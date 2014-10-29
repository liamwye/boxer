exports.home = {
  handler: function(request, reply) {
    return reply.view('index', {
      title: '| Welcome to Boxer',
      name: request.auth.credentials.name
    });
  },
  auth: 'session'
};

exports.login = {
  handler: function(request, reply) {
    // Check if the client is authenticated
    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    var message = '';
    var account = null;

    var users = {
      'liamwye@gmail.com': {
        name: 'Liam Wye',
        password: 'password'
      }
    };

    if (request.method === 'post') {
      if (!request.payload.email || !request.payload.password) {
          message = 'Missing email or password';
      } else {
        account = users[request.payload.email];

        if (!account || account.password !== request.payload.password) {
          message = 'Invalid email or password';
        }
      }
    }

    // Display the login form
    if (request.method === 'get' || message) {
      return reply.view('login', {
        title: 'Login',
        message: message
      }, {
        layout: false
      });
    }

    // Setup the client session
    request.auth.session.set(account);

    return reply.redirect('/');
  },
  auth: {
    mode: 'try',
    strategy: 'session'
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};

exports.logout = {
  handler: function(request, reply) {
    request.auth.session.clear();

    return reply.redirect('/');
  },
  auth: 'session'
};