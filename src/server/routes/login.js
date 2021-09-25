const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const config = require('../../../config');
const { getJwtToken } = require('../auth');

const adminLogin = 'login';
const adminPass = 'pass';

const loginRouter = new Router({
  prefix: '/api/login',
});

loginRouter.post('/', koaBody(), (ctx) => {
  const { login, password } = ctx.request.body;
  if (login === adminLogin && password === adminPass) {
    const token = getJwtToken({ username: 'admin' }, config.auth);
    ctx.cookies.set('jwt', token, { httpOnly: true, secure: false, sameSite: true });
    ctx.status = 200;
  } else {
    ctx.status = 401;
    ctx.body = 'wrong login/password';
  }
});

module.exports = loginRouter;
