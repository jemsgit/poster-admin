const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const authMiddleware = require('../middlewares/auth-middleware');

const channelsRouter = new Router({
  prefix: '/api/channels',
});

channelsRouter.get('/:channelId', koaBody(), authMiddleware, (ctx) => {
  console.log(ctx.request);
  ctx.status = 200;
  ctx.body = '123';
});

module.exports = channelsRouter;
