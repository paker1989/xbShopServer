const Koa = require('koa');
const session = require('koa-session');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const router = new Router();
const koa = new Koa();
const handle = app.getRequestHandler();

const collections = require('./db/db').obj;
const variable = require('./variable');
const passport = require('./server/passport');

app.prepare().then(() => {
    koa.keys = ['some secret'];
    const conf = {
        encode: (json) => JSON.stringify(json),
        decode: (str) => JSON.parse(str),
    };
    koa.use(bodyparser());
    koa.use(session(conf, koa));
    koa.use(passport.initialize());
    // 会在请求周期ctx对象挂载以下方法与属性

    //   ctx.state.user 认证用户
    //   ctx.login(user) 登录用户（序列化用户）
    //   ctx.isAuthenticated() 判断是否认证

    // 这里序列化指的是把用户对象存到session里，反序列化就是反过来，从session里取用户数据成对象
    koa.use(passport.session());
    koa.use(router.routes());
    koa.use(router.allowedMethods());

    router.get('*', (ctx) => {
        handle(ctx.req, ctx.res);
        ctx.respond = false;
    });

    router.post('/login', async (ctx) => {
        return passport.authenticate('local', function (err, code, msg) {
            if (!err) {
                ctx.login({
                    username: ctx.request.body.username,
                });
                ctx.body = {
                    code,
                    msg,
                };
            }
        })(ctx, next);
    });

    app.use(
        route.post('/custom', function (ctx) {
            return passport.authenticate('local', function (err, user, info, status) {
                if (user === false) {
                    ctx.body = { success: false };
                    ctx.throw(401);
                } else {
                    ctx.body = { success: true };
                    return ctx.login(user);
                }
            })(ctx);
        })
    );

    router.post('/userWorking', async (ctx) => {
        if (ctx.isAuthenticated()) {
            console.log('sssssssssssssssssssssss');
            ctx.body = {
                code: variable.HOME_USERWORKING_SUCC,
                mag: 'user working',
                data: [],
            };
        } else {
            console.log('未授权~~~~~~~~~~~~~~·');
            ctx.response.redirect('/login');
            ctx.response.body = {};
        }
    });

    koa.listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });
});
