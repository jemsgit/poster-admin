const Koa = require('koa');
const path = require('path');

const app = new Koa();
const logger = require('koa-logger');
const serve = require('koa-static');

const loginRouter = require('./routes/login');
const channelsRouter = require('./routes/channels');

app.use(serve(path.resolve(__dirname, '../../dist')));

app
  .use(logger())
  .use(loginRouter.routes())
  .use(channelsRouter.routes());

app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
});
