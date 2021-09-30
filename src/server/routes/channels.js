/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const authMiddleware = require('../middlewares/auth-middleware');

const channelsRouter = new Router({
  prefix: '/api/channels',
});

channelsRouter.get('/', koaBody(), authMiddleware, (ctx) => {
  console.log(ctx.request);
  const modulePath = path.resolve(process.env.PWD, './poster/settings/telegramchannels.js');
  const channels = require(modulePath);
  const result = [];
  Object.entries(channels).forEach(([key, value]) => {
    result.push({
      id: key,
      name: key,
      type: value.type,
      loadImage: value.loadImage,
      times: value.times,
    });
  });
  ctx.status = 200;
  ctx.body = result;
});

channelsRouter.get('/:channelId', koaBody(), authMiddleware, (ctx) => {
  const modulePath = path.resolve(process.env.PWD, './poster/settings/grabber.js');
  const channelSettings = require(modulePath);
  const channelParams = channelSettings[ctx.params.channelId];
  if (!channelParams) {
    ctx.status = 404;
    ctx.body = 'Not found';
    return;
  }
  let fileList = [];
  if (channelParams.pendingContent) {
    fileList.push(channelParams.pendingContent);
  }

  if (channelParams.content) {
    if (!Array.isArray(channelParams.content)) {
      channelParams.content = [channelParams.content];
    }
    fileList = fileList.concat(channelParams.content);
  }

  if (channelParams.contentResult) {
    fileList.push(channelParams.contentResult);
  }

  ctx.status = 200;
  ctx.body = fileList;
});

module.exports = channelsRouter;
