/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const { getFileTopContent, updateFileTopContent } = require('../utils/file-utils');

const POSTER_FOLDER = './poster';
const CHANNEL_SETTINGS_PATH = './poster/settings/telegramchannels.js';
const GRABBER_SETTINGS_PATH = './poster/settings/grabber.js';
const EDIT_LINES_COUNT = 100;

async function getFileInfo(fileList) {
  const promises = [];
  fileList.forEach((val) => {
    const fielPath = path.resolve(process.env.PWD, POSTER_FOLDER, val);
    const def = getFileTopContent(fielPath, EDIT_LINES_COUNT).catch(() => '');
    promises.push(def);
  });

  const contentData = await Promise.all(promises);

  const fileContentList = [];
  fileList.forEach((val, index) => {
    fileContentList.push({
      name: val,
      content: contentData[index],
    });
  });
  return fileContentList;
}

function getChannelFilesPath(channelFilesParams) {
  let fileList = [];
  if (!channelFilesParams) {
    return fileList;
  }
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
  return fileList;
}

async function getChannelInfo(channelInfo, channelFilesParams, id) {
  if (!channelInfo && !channelFilesParams) {
    return undefined;
  }
  let times;

  const fileList = getChannelFilesPath(channelFilesParams);
  const fileContentList = await getFileInfo(fileList);

  if (channelInfo) {
    ({ times } = channelInfo);
  }

  return {
    files: fileContentList,
    times,
    id,
  };
}

async function getChannelInfoById(channelId) {
  let modulePath = path.resolve(process.env.PWD, GRABBER_SETTINGS_PATH);
  const channelSettings = require(modulePath);
  modulePath = path.resolve(process.env.PWD, CHANNEL_SETTINGS_PATH);
  const channels = require(modulePath);
  const channelInfo = channels[channelId];
  const channelFilesParams = channelSettings[channelId];
  const data = await getChannelInfo(channelInfo, channelFilesParams, channelId);
  return data;
}

function getChannelsList() {
  const modulePath = path.resolve(process.env.PWD, CHANNEL_SETTINGS_PATH);
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
  return result;
}

function checkChannelHasFile(id, filePath) {
  const modulePath = path.resolve(process.env.PWD, GRABBER_SETTINGS_PATH);
  const channelSettings = require(modulePath);

  const channelFilesParams = channelSettings[id];
  if (!channelFilesParams) {
    return false;
  }
  const fileList = getChannelFilesPath(channelFilesParams);
  return fileList.some((item) => item === filePath);
}

async function updateFileContent(filePath, content) {
  let result = true;
  try {
    const file = path.resolve(process.env.PWD, POSTER_FOLDER, filePath);
    await updateFileTopContent(file, content, EDIT_LINES_COUNT);
  } catch (e) {
    result = false;
  }

  return result;
}

module.exports = {
  getChannelInfoById,
  getChannelsList,
  checkChannelHasFile,
  updateFileContent,
};
