const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const koaSession = require('koa-session');
const passport = require('koa-passport');

const config = require('./config/config');
const routers = require('./router');
const { errorHandler } = require('./core/errorHandler');

const app = new Koa();

const { port, formData, auth } = config;

app.use(errorHandler);

// auth middlewares
app.keys = auth.appKeys;
app.use(koaSession(auth.session, app));
app.use(passport.initialize());
app.use(passport.session());

app.use(koaStatic(path.join(__dirname, '../static')));

app.use(cors());

app.use(koaBody(formData));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
