/* eslint-disable no-unreachable */
const { checkJwtToken } = require('../auth');
const config = require('../../../config');

async function authMiddleware(ctx, next) {
  const token = ctx.cookies.get('jwt', { httpOnly: true });
  if (!token) ctx.throw(401, 'Not authorized');
  try {
    checkJwtToken(token, config.auth);
  } catch (e) {
    ctx.throw(401, 'Not authorized');
  }
  console.log(token);
  await next();
}

module.exports = authMiddleware;
