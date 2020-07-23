const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');

const config = require('./config/config');
const routers = require('./router');
const { errorHandler } = require('./core/errorHandler');

const app = new Koa();

const { port, formData } = config;

app.use(errorHandler);

app.use(koaStatic(path.join(__dirname, '../static')));

app.use(cors());

app.use(koaBody(formData));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
