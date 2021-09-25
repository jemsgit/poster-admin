const jwt = require('jsonwebtoken');

function getJwtToken(userInfo = {}, authConfig) {
  const { secret, cookieOptions } = authConfig;
  const { ttl } = cookieOptions;
  return jwt.sign(userInfo, secret, { expiresIn: ttl });
}

function checkJwtToken(token, authConfig) {
  jwt.verify(token, authConfig.secret);
}

module.exports = {
  getJwtToken,
  checkJwtToken,
};
