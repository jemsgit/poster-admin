const Koa = require('koa');

const app = new Koa();
const logger = require('koa-logger');

const loginRouter = require('./routes/login');
const channelsRouter = require('./routes/channels');

app
  .use(logger())
  .use(loginRouter.routes())
  .use(channelsRouter.routes());

app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
});
