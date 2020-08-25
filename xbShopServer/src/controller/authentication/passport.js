// passport.js
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const variable = require('../variable'); // 控制全局变量的文件，可忽略
const collections = require('../db/db').obj; // 数据库操作文件，可忽略

async function findUser(data) {
    // 查找用户是否存在的方法
    return new Promise((resolve, reject) => {
        collections.users.findOne(data, (err, res) => {
            if (err) {
                resolve(variable.SIGN_IN_FALIED);
                throw err;
            }
            if (res) {
                resolve(variable.SIGN_IN_SUCC);
            } else {
                resolve(variable.USER_DOESNOT_EXIST);
            }
        });
    });
}

// 提交数据(策略)
passport.use(
    new LocalStrategy(
        /**
         * @param username 用户输入的用户名
         * @param password 用户输入的密码
         * @param done 验证验证完成后的回调函数，由passport调用
         */
        {
            usernameField: 'username',
            passwordField: 'pwd',
        },

        async function (username, password, done) {
            console.log('passport--->', username, password);
            const data = {
                username,
                pwd: password,
            };
            const result = await findUser(data);
            console.log('result------', result);
            if (result === variable.SIGN_IN_SUCC) {
                return done(null, result, 'login success'); // done执行的是login里passport.authenticate的回调函数
            }
            return done(null, result, 'user doesnot exist');
        }
    )
);
// 序列化ctx.login()触发  serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
    console.log('serializeUser: ------>>>>>>>>>>>', user);
    done(null, user);
});
// 反序列化（请求时，session中存在user时触发）
passport.deserializeUser(async function (user, done) {
    console.log('deserializeUser: ', user);
    done(null, user);
});
module.exports = passport;
