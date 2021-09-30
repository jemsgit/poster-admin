/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const Router = require('koa-router');
const koaBody = require('koa-bodyparser');
const authMiddleware = require('../middlewares/auth-middleware');

const channelsRouter = new Router({
  prefix: '/api/channels',
});

function getChannelInfo(channelInfo, channelFilesParams, id) {
  if (!channelInfo && !channelFilesParams) {
    return undefined;
  }

  let fileList = [];
  let times;
  if (channelFilesParams) {
    const { pendingContent, contentResult } = channelFilesParams;
    let { content } = channelFilesParams;

    if (pendingContent) {
      fileList.push(pendingContent);
    }

    if (content) {
      if (!Array.isArray(content)) {
        content = [content];
      }
      fileList = fileList.concat(content);
    }

    if (contentResult) {
      fileList.push(contentResult);
    }
  }

  if (channelInfo) {
    ({ times } = channelInfo);
  }

  return {
    files: fileList,
    times,
    id,
  };
}

channelsRouter.get('/', koaBody(), authMiddleware, (ctx) => {
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
  let modulePath = path.resolve(process.env.PWD, './poster/settings/grabber.js');
  const channelSettings = require(modulePath);
  modulePath = path.resolve(process.env.PWD, './poster/settings/telegramchannels.js');
  const channels = require(modulePath);
  const { channelId } = ctx.params;
  const channelInfo = channels[channelId];
  const channelFilesParams = channelSettings[channelId];

  const channelData = getChannelInfo(channelInfo, channelFilesParams, channelId);

  if (!channelData) {
    ctx.status = 404;
    ctx.body = 'Not found';
    return;
  }

  ctx.status = 200;
  ctx.body = channelData;
});

module.exports = channelsRouter;
