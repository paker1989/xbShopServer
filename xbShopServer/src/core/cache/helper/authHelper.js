const { auth } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');
const { HttpException } = require('../../httpException');

const { lRangeAsync, rpushAsync, getAsync } = async;
const { prefix, keys } = auth;
const { meta, detail, ids } = keys;

const config = {
    expire: {
        admins: 60 * 60 * 4, // 4 小时
    },
};

/**
 * return user access redis key;
 * format: auth:useraccess
 */
const _USER_ACCESS_KEY = `${prefix}:${keys.access}`;

/**
 * return user role  redis key;
 * format: auth:userrole
 */
const _USER_ROLES_KEY = `${prefix}:${keys.userRole}`;

/**
 * return admin list redis key;
 * format: auth:admins
 */
const _ADMIN_LIST_KEY = `${prefix}:${keys.adminList}`;

const getCachedUserAccess = async () => {
    const allUserAccess = await getAsync.call(redisClient, _USER_ACCESS_KEY);
    if (allUserAccess) {
        return JSON.parse(allUserAccess);
    }
    return null;
};

const setCachedUserAccess = (userAccesses) => {
    redisClient.set(_USER_ACCESS_KEY, JSON.stringify(userAccesses));
};

const delCachedUserAccess = () => {
    redisClient.del(_USER_ACCESS_KEY);
};

const getCachedUserRoles = async () => {
    const allUserRoles = await getAsync.call(redisClient, _USER_ROLES_KEY);
    if (allUserRoles) {
        return JSON.parse(allUserRoles);
    }
    return null;
};

const setCachedUserRoles = (userRoles) => {
    redisClient.set(_USER_ROLES_KEY, JSON.stringify(userRoles));
};

const delCachedUserRoles = () => {
    redisClient.del(_USER_ROLES_KEY);
};

/**
 * get cached admin lists
 * @param {*} allAdmins
 */
const getCachedAdminList = async () => {
    const allAdmins = await getAsync.call(redisClient, _ADMIN_LIST_KEY);
    if (allAdmins) {
        return JSON.parse(allAdmins);
    }
    return null;
};

/**
 * set cached admin lists
 * @param {*} allAdmins
 */
const setCachedAdminList = async (allAdmins) => {
    redisClient.set(_ADMIN_LIST_KEY, JSON.stringify(allAdmins), 'EX', config.expire.admins);
};

/**
 * update an admin, including creation case
 * @param {*} updated
 */
const updateAdmin = async (updated) => {
    if (!updated) {
        return;
    }

    const cached = await getCachedAdminList();
    if (!cached) {
        return;
    }

    const index = cached.findIndex((item) => item.idUser === cached.idUser);
    if (index > -1) {
        cached.splice(index, 1, updated);
    } else {
        cached.unshift(updated);
    }
    setCachedAdminList(cached);
};

const updateRole = async (updated) => {
    if (!updated) {
        return;
    }

    const cached = await getCachedUserRoles();
    if (!cached) {
        return;
    }

    const index = cached.findIndex((item) => item.idRole === cached.idRole);
    if (index > -1) {
        cached.splice(index, 1, updated);
    } else {
        cached.unshift(updated);
    }
    setCachedUserRoles(cached);
};

module.exports = {
    getCachedUserAccess,
    setCachedUserAccess,
    delCachedUserAccess,
    getCachedUserRoles,
    setCachedUserRoles,
    delCachedUserRoles,
    getCachedAdminList,
    setCachedAdminList,
    updateAdmin,
    updateRole,
};
