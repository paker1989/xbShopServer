const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const helmet = require('koa-helmet');
const koaSession = require('koa-session');
const passport = require('./controller/authentication/passport');

const config = require('./config/config');
const routers = require('./router');
const { errorHandler } = require('./core/errorHandler');

const { contentSecurityPolicy, dnsPrefetchControl, referrerPolicy } = helmet;
// Construct scripts CSP based on services in use by this installation
const defaultSrc = ["'self'"];
const scriptSrc = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];

const app = new Koa();

const { port, formData, auth } = config;

app.use(errorHandler);

// auth middlewares
app.keys = auth.appKeys;
app.use(koaSession(auth.session, app));

app.use(koaBody(formData));

app.use(passport.initialize());
app.use(passport.session());

app.use(koaStatic(path.join(__dirname, '../static')));

app.use(cors({ credentials: true }));

app.use(helmet());
app.use(
    contentSecurityPolicy({
        directives: {
            defaultSrc,
            scriptSrc,
            styleSrc: ["'self'", "'unsafe-inline'", 'github.githubassets.com'],
            imgSrc: ['*', 'data:', 'blob:'],
            frameSrc: ['*'],
            connectSrc: ['*'],
            // Removed because connect-src: self + websockets does not work in Safari
            // Ref: https://bugs.webkit.org/show_bug.cgi?id=201591
            // connectSrc: compact([
            //   "'self'",
            //   process.env.AWS_S3_UPLOAD_BUCKET_URL.replace("s3:", "localhost:"),
            //   "www.google-analytics.com",
            //   "api.github.com",
            //   "sentry.io",
            // ]),
        },
    })
);
app.use(dnsPrefetchControl({ allow: true }));
app.use(referrerPolicy({ policy: 'no-referrer' }));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
