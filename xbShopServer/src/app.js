const Koa = require('koa');
const bodyParser = require('koa-body');

const config = require('./config/config');
const routers = require('./router');

const app = new Koa();

const { port } = config;

app.use(bodyParser());
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
