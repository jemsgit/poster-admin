const serviceHost = process.env.SERVICE_HOST || process.env.HOST || 'localhost';

const config = {
  serviceHost,
  auth: {
    secret: 'secret',
    cookieOptions: {
      ttl: '1 h'
    }
  },
  client: {
    endpoints: {
      auth: {
        post: '/api/login'
      }
    }
  }
};

module.exports = config;
