const passport = require('./passport');
const { Resolve } = require('../../core/resolve');

const login = async (ctx, next) => {
    // console.log(ctx.isAuthenticated());
    // console.log(ctx.state.user);
    // console.log(ctx.session);

    if (ctx.isAuthenticated() && ctx.state.user) {
        Resolve.json(ctx, ctx.state.user);
    } else {
        return passport.authenticate('local', async (err, user, msg) => {
            // console.log(err);
            // console.log(user);
            // console.log(msg);
            if (user !== false) {
                await ctx.login(user);
                Resolve.json(ctx, user, 'login succeed');
            } else {
                Resolve.info(ctx, msg);
            }
        })(ctx, next);
    }
};

const logout = async (ctx) => {
    if (ctx.isAuthenticated() && ctx.state.user) {
        ctx.logout();
        // console.log(ctx.session);
        ctx.session = null;
        Resolve.info(ctx, 'logout succeed');
    } else {
        Resolve.info(ctx, 'already logout');
    }
};

module.exports = {
    login,
    logout,
};
