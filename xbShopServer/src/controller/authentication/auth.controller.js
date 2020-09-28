const passport = require('./passport');
const { Resolve } = require('../../core/resolve');
const authHelper = require('../../core/cache/helper/authHelper');
const AuthDAO = require('../../dao/auth.dao');
const { HttpException } = require('../../core/httpException');

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

const getAllUserAccess = async (ctx) => {
    const cached = await authHelper.getCachedUserAccess();
    if (cached) {
        // if found in cache, returned
        // console.log('cached user access');
        Resolve.json(ctx, cached);
        return;
    }

    const userAccesses = await AuthDAO.fetchUserAccess(); // fetch from db
    if (userAccesses.error) {
        Resolve.info(ctx, userAccesses.error, 500);
    } else {
        authHelper.setCachedUserAccess(userAccesses); // cache the product meta
        Resolve.json(ctx, userAccesses);
    }
};

const getAllUserRoles = async (ctx) => {
    const cached = await authHelper.getCachedUserRoles();
    if (cached) {
        // if found in cache, returned
        // console.log('cached user roles');
        Resolve.json(ctx, cached);
        return;
    }

    const userRoles = await AuthDAO.fetchUserRoles(); // fetch from db
    if (userRoles.error) {
        Resolve.info(ctx, userRoles.error, 500);
    } else {
        authHelper.setCachedUserRoles(userRoles); // cache the product meta
        Resolve.json(ctx, userRoles);
    }
};

const updateAdmin = async (ctx) => {
    try {
        const requestBody = ctx.request.body;
        // console.log(requestBody);
        const updatedAdmin = await AuthDAO.saveAdmin(requestBody);
        // console.log(updatedAdmin);
        if (updateAdmin) {
            // todo: handle cache
            Resolve.json(ctx, updatedAdmin);
        } else {
            Resolve.info(ctx, 'failed due to unknown reason');
        }
    } catch (err) {
        throw new HttpException(err.message);
    }
};

module.exports = {
    login,
    logout,
    getAllUserAccess,
    getAllUserRoles,
    updateAdmin,
};
