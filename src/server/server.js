const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const logger = require('koa-logger');
const serve = require('koa-static');
require('./db/models/index');

const app = new Koa();
const staticRouter = new Router();
staticRouter.get('(.*)', (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, '../../dist/index.html'));
});

const loginRouter = require('./routes/login');
const channelsRouter = require('./routes/channels');

app.use(serve(path.resolve(__dirname, '../../dist')));

app
  .use(logger())
  .use(loginRouter.routes())
  .use(channelsRouter.routes())
  .use(staticRouter.routes());

app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
  console.log(process.env.DB_LOGIN);
  console.log(process.env.TEST_ENV);
});
