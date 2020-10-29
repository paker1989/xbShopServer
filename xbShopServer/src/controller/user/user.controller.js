const AuthDAO = require('../../dao/auth.dao');
const { Resolve } = require('../../core/resolve');
const authHelper = require('../../core/cache/helper/authHelper');

const authTypes = require('../../core/type/authType');
/**
 * attempt to delete a user role
 * @param {*} ctx
 */
const deleteUserrole = async (ctx) => {
    const { idRole } = ctx.request.body;
    // check if any admin linked
    let linkedAdmins = [];
    const cachedAdmins = await authHelper.getCachedAdminList();
    if (cachedAdmins) {
        linkedAdmins = cachedAdmins.filter((admin) => admin.pref.role.idRole === idRole);
    } else {
        const admins = await AuthDAO.getAllAdmins();
        authHelper.setCachedAdminList(admins);
        linkedAdmins = admins.filter((admin) => admin.pref.role.idRole === idRole);
    }
    if (linkedAdmins && linkedAdmins.length > 0) {
        Resolve.json(
            ctx,
            linkedAdmins.map((admin) => admin.username),
            authTypes._AUTH_ROLE_LINKED_ADMINS,
            // 'remove related admins before delete',
            401
        );
        return;
    }
    const result = await AuthDAO.deleteUserrole(idRole); // boolean result
    if (result) {
        authHelper.delCachedUserRoles(); // delete user roles
        Resolve.info(ctx, 'delete succeed');
    } else {
        Resolve.info(ctx, 'delete failed', 401);
    }
};

module.exports = {
    deleteUserrole,
};
