const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const AuthDAO = require('../../dao/auth.dao');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            const result = await AuthDAO.findUser(username, password);
            if (result.error) {
                return done(null, null, result.error); // done执行的是login里passport.authenticate的回调函数
            }
            return done(null, result.user);
        }
    )
);

// 序列化ctx.login()触发  serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser((user, done) => {
    // console.log('serializeUser: ------>>>>>>>>>>>' + user);
    done(null, user);
});

// 反序列化（请求时，session中存在user时触发）
passport.deserializeUser(async (user, done) => {
    try {
        // console.log('deserializeUser: ' + user);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
