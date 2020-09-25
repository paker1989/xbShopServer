const { auth } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');
const { HttpException } = require('../../httpException');

const { lRangeAsync, rpushAsync, getAsync } = async;
const { prefix, keys } = auth;
const { meta, detail, ids } = keys;

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

module.exports = {
    getCachedUserAccess,
    setCachedUserAccess,
    delCachedUserAccess,
    getCachedUserRoles,
    setCachedUserRoles,
    delCachedUserRoles,
};
