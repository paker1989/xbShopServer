const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const config = require('./config/config');
const routers = require('./router');
const { errorHandler } = require('./core/errorHandler');

const app = new Koa();

const { port } = config;

app.use(errorHandler);
app.use(cors());
app.use(koaBody());
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
