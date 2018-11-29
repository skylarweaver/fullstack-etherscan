const Koa = require('koa');
const cors = require('@koa/cors');
const next = require('next');
const Router = require('koa-router');
const mongoose = require('mongoose');
require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect(process.env.MONGO_URI);

app.prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();
    require('./routes')(router);
    server.use(cors());

    router.get('/', async ctx => {
      ctx.redirect('/search');
    });

    router.get('/search', async ctx => {
      await app.render(ctx.req, ctx.res, '/search', ctx.query);
      ctx.respond = false;
    });

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes());
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
