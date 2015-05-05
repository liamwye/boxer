module.exports = {
  server: {
    $filter: 'env',
    production: {
      host: 'localhost',
      port: 8000
    },
    $default: {
      host: 'localhost',
      port: 8000
    }
  },
  database: {
    $filter: 'env',
    production: {
      host: '',
      port: '27017',
      db: 'boxer',
      username: '',
      password: ''
    },
    $default: {
      host: 'localhost',
      port: '27017',
      db: 'boxer',
      username: '',
      password: ''
    }
  },
  email: {
    $filter: 'env',
    production: {
      from: {
        name: '',
        address: ''
      },
      transport: {
          service: 'Mailgun',
          auth: {
            user: '',
            pass: ''
          }
      }
    },
    $default: {
      from: {
        name: 'Grim',
        address: 'grim@liamwye.me'
      },
      transport: {
          service: 'Mailgun',
          auth: {
            user: '',
            pass: ''
          }
      }
    }
  }
};
