const serviceHost = process.env.SERVICE_HOST || process.env.HOST || 'localhost';
const secret = process.env.AUTH_SECRET || 'secret';

const config = {
  serviceHost,
  auth: {
    secret,
    cookieOptions: {
      ttl: '5 d',
    },
  },
  client: {
    endpoints: {
      auth: {
        post: '/api/login',
        logout: '/api/login/logout',
      },
      channels: {
        get: '/api/channels',
        getDetails: '/api/channels/{channelId}',
        saveContent: '/api/channels/saveFile/{channelId}'
      },
    },
  },
};

module.exports = config;
