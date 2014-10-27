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
        name: 'Grim',
        address: 'grim@liamwye.me'
      },
      transport: {
          service: 'Mailgun',
          auth: {
            user: 'postmaster@liamwye.me',
            pass: '736ad6f1091aaa6aee8963eb8642b892'
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
            user: 'postmaster@sandbox727bba01f84846ffa4ef0a4a09fac9ea.mailgun.org',
            pass: '537af57abb27fa0ecdf69432431f5f3f'
          }
      }
    }
  }
};
