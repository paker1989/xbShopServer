const { auth } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');
// const { HttpException } = require('../../httpException');

const { getAsync } = async;
const { prefix, keys } = auth;

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

const removeAdmin = async (idAdmin) => {
    const cached = await getCachedAdminList();
    if (!cached) {
        return;
    }
    const index = cached.findIndex((item) => item.idUser === idAdmin);
    if (index > -1) {
        cached.splice(index, 1);
        setCachedAdminList(cached);
    }
};

/**
 * update an admin, including creation case
 * @param {*} updated
 */
const updateAdmin = async (updated) => {
    // console.log(typeof updated);
    if (!updated || !updated.hasOwnProperty('idUser')) {
        return;
    }

    const cached = await getCachedAdminList();
    if (!cached) {
        return;
    }

    const index = cached.findIndex((item) => item.idUser === updated.idUser);
    if (index > -1) {
        cached.splice(index, 1, updated);
    } else {
        cached.unshift(updated);
    }
    await setCachedAdminList(cached);
};

const updateAdminsByRole = async (updatedRole) => {
    if (!updatedRole) {
        return;
    }

    const cachedAdmins = await getCachedAdminList();
    if (!cachedAdmins) {
        return;
    }
    let flag = false;
    cachedAdmins.forEach((admin) => {
        if (admin.pref.role.idRole === updatedRole.idRole) {
            admin.pref.role.label = updatedRole.label;
            flag = true;
        }
    });
    if (flag) {
        await setCachedAdminList(cachedAdmins);
    }
};

const updateRole = async (updated) => {
    if (!updated || !updated.hasOwnProperty('idRole')) {
        return;
    }

    const cached = await getCachedUserRoles();
    if (!cached) {
        return;
    }

    const index = cached.findIndex((item) => item.idRole === updated.idRole);
    if (index > -1) {
        cached.splice(index, 1, updated);
    } else {
        cached.unshift(updated);
    }
    await setCachedUserRoles(cached);
    // update linked admins
    await updateAdminsByRole(updated);
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
    removeAdmin,
    updateRole,
};
