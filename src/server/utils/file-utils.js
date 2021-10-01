const fs = require('fs');
const { EOL } = require('os');

const ENCODING = 'utf-8';

function getRequiredContent(data, lines) {
  return data.split(EOL).slice(0, lines).join(EOL);
}

async function getFileTopContent(path, lines) {
  let readable;
  try {
    readable = fs.createReadStream(path);
  } catch (e) {
    return '';
  }

  readable.setEncoding(ENCODING);

  return new Promise((res, rej) => {
    let result = '';
    readable.on('data', (chunk) => {
      result += chunk.toString();
      const currentLines = chunk.toString().split(EOL).length;
      if (currentLines > lines) {
        result = result.split(EOL).slice(0, lines).join(EOL);
        res(getRequiredContent(result, lines));
        readable.destroy();
      }
    });
    readable.on('end', () => res(getRequiredContent(result, lines)));
    readable.on('error', (e) => rej(e));
  });
}

function updateFileTopContent(path, content, lines) {
  let readable;
  try {
    readable = fs.createReadStream(path);
  } catch (e) {
    return '';
  }
  readable.setEncoding('utf-8');

  const newContent = content.split(EOL);

  return new Promise((res, rej) => {
    let result = '';
    readable.on('data', (chunk) => {
      result += chunk.toString();
    });
    readable.on('end', () => {
      readable.destroy();
      const chunks = result.split(EOL);
      chunks.splice(0, lines, ...newContent);
      fs.writeFile(path, chunks.join(EOL), (e) => {
        if (e) {
          rej(e);
        } res();
      });
    });
    readable.on('error', rej);
  });
}

module.exports = {
  getFileTopContent,
  updateFileTopContent,
};
