const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const config = require('../../../config');
const { getJwtToken } = require('../auth');
const { hashPassword } = require('../services/password');
const { findUserWithPassword } = require('../services/users');

const loginRouter = new Router({
  prefix: '/api/login',
});

loginRouter.post('/', koaBody(), async (ctx) => {
  const { login, password } = ctx.request.body;
  const hashedPassword = await hashPassword(password);
  const user = await findUserWithPassword(login, hashedPassword);
  console.log(user);
  console.log('user');
  if (user) {
    const token = getJwtToken({ username: 'admin' }, config.auth);
    ctx.cookies.set('jwt', token, { httpOnly: true, secure: false, sameSite: true });
    ctx.status = 200;
    ctx.body = true;
  } else {
    ctx.status = 401;
    ctx.body = 'wrong login/password';
  }
});

module.exports = loginRouter;
