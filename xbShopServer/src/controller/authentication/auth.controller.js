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
        console.log('cached user access');
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
        const { idAdmin = -1 } = requestBody;

        // check duplica for create case
        if (parseInt(idAdmin, 10) === -1) {
            const error = await AuthDAO.checkDuplica(requestBody);

            if (error.length > 0) {
                Resolve.info(ctx, error, 403);
                return;
            }
        }

        // console.log(requestBody);
        const updatedAdmin = await AuthDAO.saveAdmin(requestBody);
        // console.log(updatedAdmin);
        if (updatedAdmin) {
            authHelper.updateAdmin(updatedAdmin);
            Resolve.json(ctx, updatedAdmin);
        } else {
            Resolve.info(ctx, 'failed due to unknown reason', 501);
        }
    } catch (err) {
        throw new HttpException(err.message);
    }
};

/**
 * create or update role
 * @param {*} ctx
 */
const updateRole = async (ctx) => {
    try {
        const requestBody = ctx.request.body;
        const updatedRole = await AuthDAO.saveRole(requestBody);
        // console.log('auth.controller: updateRole');
        // console.log(updatedRole);
        if (updatedRole) {
            authHelper.updateRole(updatedRole);
            Resolve.json(ctx, updatedRole);
        } else {
            Resolve.info(ctx, 'update role failed due to unknown reason', 503);
        }
    } catch (err) {
        throw new HttpException(err.message);
    }
};

/**
 * return all admins
 * @param {*} ctx
 */
const allAdmins = async (ctx) => {
    const cached = await authHelper.getCachedAdminList();
    if (cached) {
        Resolve.json(ctx, cached);
    } else {
        const admins = await AuthDAO.getAllAdmins();
        // console.log('all admins:');
        // console.log(admins);
        authHelper.setCachedAdminList(admins);
        Resolve.json(ctx, admins);
    }
};

module.exports = {
    login,
    logout,
    getAllUserAccess,
    getAllUserRoles,
    updateAdmin,
    allAdmins,
    updateRole,
};
