const AuthDAO = require('../../dao/auth.dao');
const { Resolve } = require('../../core/resolve');
// const { HttpException } = require('../../core/httpException');
const authHelper = require('../../core/cache/helper/authHelper');
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
            'remove related admins before delete'
        );
        return;
    }
    // const result = await AuthDAO.deleteUserrole(idRole);
};

module.exports = {
    deleteUserrole,
};
