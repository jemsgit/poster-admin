const { checkJwtToken } = require('../auth');
const config = require('../../../config');

async function authMiddleware(ctx, next) {
    const token = ctx.cookies.get('jwt');  
    if (!token) ctx.throw(401, 'Not authorized');
    try {
      checkJwtToken(token, config.auth);
    } catch(e) {
      console.log(e);
      ctx.throw(401, 'Not authorized');
    }
    console.log(token);
    await next();
}

module.exports = authMiddleware;