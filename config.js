const serviceHost = process.env.SERVICE_HOST || process.env.HOST || 'localhost';

const config = {
  serviceHost,
  auth: {
    secret: 'secret',
    cookieOptions: {
      ttl: '1 h',
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
