const { fn, col, where, Op } = require('sequelize');

const { sequelize } = require('../core/db');

const UserModel = require('../model/user/user');
const UserPrefModel = require('../model/user/userPref');
const UserRoleModel = require('../model/user/userRole');
const UserAccessModel = require('../model/user/userAccess');

const encryptHelper = require('../core/encryptionHelper');
const variables = require('../core/authHelper');

const authTypes = require('../core/type/authType');

class AuthDAO {
    static async findUserByPK(idUser) {
        const completedUser = await UserModel.findByPk(idUser, {
            include: [
                {
                    model: UserPrefModel,
                    as: 'pref',
                    attributes: { exclude: ['userroleId', 'userId', 'userAccessId'] },
                    include: [
                        {
                            model: UserRoleModel,
                            as: 'role',
                            // 如何avoid extra joinction table as below for belongs-to-many relationship
                            // include: [
                            //     {
                            //         model: UserAccessModel,
                            //         as: 'accesses',
                            //         through: {
                            //             attributes: [],
                            //         },
                            //     },
                            // ],
                        },
                        {
                            model: UserAccessModel,
                            as: 'indexPage',
                        },
                    ],
                },
            ],
        });

        // const completedUser = await UserModel.findByPk(finded.get('idUser'), {
        //     include: {
        //         all: true,
        //         nested: true,
        //     },
        // });
        return completedUser.toJSON();
    }

    /**
     * find user for authentication
     * @param {*} username
     * @param {*} pwd
     */
    static async findUser(username, pwd) {
        const finded = await UserModel.findOne({
            where: { isDeleted: false, username },
        });

        if (!finded) {
            return {
                error: variables._USERNAME_ERROR,
            };
        }

        const passwordHash = finded.get('password');
        const isPasswordMatch = encryptHelper.comparePassword(pwd, passwordHash);

        if (isPasswordMatch) {
            const completedUser = await AuthDAO.findUserByPK(finded.get('idUser'));
            return {
                user: completedUser,
            };
        }
        return {
            error: variables._PASSWORD_ERROR,
        };
    }

    static async fetchUserAccess() {
        const finded = await UserAccessModel.findAll({ raw: true });

        if (!finded) {
            return {
                error: variables._FETCH_USERACCESS_ERROR,
            };
        }

        return finded;
    }

    /**
     * fetch all user roles
     */
    static async fetchUserRoles() {
        const finded = (
            await UserRoleModel.findAll({
                include: [
                    {
                        model: UserAccessModel,
                        as: 'accesses',
                        through: {
                            attributes: [],
                        },
                    },
                ],
            })
        ).map((el) => el.toJSON());

        if (!finded) {
            return {
                error: variables._FETC_USERROLE_ERROR,
            };
        }

        return finded;
    }

    /**
     * return all admins
     */
    static async getAllAdmins() {
        const { rows } = await UserModel.findAndCountAll({
            include: [
                {
                    model: UserPrefModel,
                    as: 'pref',
                    attributes: { exclude: ['userroleId', 'userId', 'userAccessId'] },
                    include: [
                        {
                            model: UserRoleModel,
                            as: 'role',
                        },
                        {
                            model: UserAccessModel,
                            as: 'indexPage',
                        },
                    ],
                },
            ],
            order: ['idUser'],
        });

        return rows.map((item) => item.toJSON());
    }

    /**
     * save or update admin user
     * @param {*} ctxBody
     */
    static async saveAdmin(ctxBody) {
        let pk;
        const {
            email,
            phoneNumber,
            idRole,
            defaultPage,
            isActive,
            isDeleted = false,
            password,
            idAdmin = -1,
            action,
        } = ctxBody;

        const idAdminInt = parseInt(idAdmin, 10);

        // create case
        if (idAdminInt === -1) {
            const encryptedPassword = encryptHelper.bcryptHashSync(password);
            pk = await sequelize.transaction(async (t) => {
                const newAdmin = await UserModel.create(
                    {
                        username: email,
                        password: encryptedPassword,
                        phoneNumber,
                        email,
                        isActive,
                        isDeleted,
                    },
                    {
                        transaction: t,
                    }
                );

                const userPref = await UserPrefModel.create(
                    {
                        userroleId: parseInt(idRole, 10),
                        userAccessId: parseInt(defaultPage, 10),
                        userId: newAdmin.idUser,
                    },
                    { transaction: t }
                );

                // set categories
                await newAdmin.setPref(userPref, { transaction: t });

                return newAdmin.idUser;
            });
        } else if (action) {
            if (action === 'delete' || action === 'restore') {
                const [updatedRow] = await UserModel.update(
                    {
                        isDeleted: action === 'delete',
                    },
                    {
                        where: { idUser: idAdminInt },
                    }
                );

                if (updatedRow === 1) {
                    pk = idAdminInt;
                }
            }

            if (action === 'update') {
                const updateCondition = {};
                const prefUpdateCondition = {};
                if (email) {
                    updateCondition.email = email;
                }
                if (typeof isActive !== 'undefined') {
                    updateCondition.isActive = isActive;
                }
                if (phoneNumber) {
                    updateCondition.phoneNumber = phoneNumber;
                }
                if (password) {
                    updateCondition.password = encryptHelper.bcryptHashSync(password);
                }
                if (idRole) {
                    prefUpdateCondition.userroleId = parseInt(idRole, 10);
                }
                if (defaultPage) {
                    prefUpdateCondition.userAccessId = parseInt(defaultPage, 10);
                }

                pk = await sequelize.transaction(async (t) => {
                    if (Object.keys(updateCondition).length > 0) {
                        await UserModel.update(updateCondition, {
                            where: { idUser: idAdminInt },
                            transaction: t,
                        });
                    }
                    if (idRole || defaultPage) {
                        await UserPrefModel.update(prefUpdateCondition, {
                            where: { userId: idAdminInt },
                            transaction: t,
                        });
                    }
                    return idAdminInt;
                });
            }
        }

        if (pk) {
            return AuthDAO.findUserByPK(pk);
        }
        return pk; // undefined
    }

    /**
     * destroy an admin
     * @param {*} idAdmin
     */
    static async destroyAdmin(idAdmin) {
        if (idAdmin) {
            const toDestroy = await UserModel.findByPk(idAdmin, { include: [{ model: UserPrefModel, as: 'pref' }] });
            if (toDestroy) {
                await sequelize.transaction(async (t) => {
                    // const userPrefId = toDestroy.getDataValue('')
                    await toDestroy.destroy({
                        transaction: t,
                    });
                    const userPref = toDestroy.pref;
                    // console.log(userPref.destroy);
                    await userPref.destroy({ transaction: t });
                });

                return true;
            }
        }
        return false;
    }

    /**
     * delete definitely a role
     * @param {*} idRole
     */
    static async deleteUserrole(idRole) {
        const affectedRows = await UserRoleModel.destroy({
            where: {
                idRole,
            },
        });
        return affectedRows === 1;
    }

    /**
     * save or update admin user
     * @param {*} ctxBody
     */
    static async saveRole(ctxBody) {
        let pk;
        const { idRole = -1, roleName: label, accesses } = ctxBody;
        if (parseInt(idRole, 10) === -1) {
            pk = await sequelize.transaction(async (t) => {
                const newRole = await UserRoleModel.create(
                    {
                        label,
                    },
                    {
                        transaction: t,
                    }
                );

                // set accesses
                await newRole.setAccesses(accesses, { transaction: t });

                return newRole.idRole;
            });
        } else {
            const updateCondition = {};
            let updateFlag = false;
            if (label) {
                updateCondition.label = label;
                updateFlag = true;
            }

            if (updateFlag) {
                const [updatedRow] = await UserRoleModel.update(updateCondition, { where: { idRole } });
                if (updatedRow === 1) {
                    pk = idRole;
                }
            }

            if (accesses) {
                const toUpdate = await UserRoleModel.findByPk(idRole);
                if (toUpdate) {
                    await toUpdate.setAccesses(accesses);
                    pk = idRole;
                }
            }
        }

        if (pk) {
            return (
                await UserRoleModel.findByPk(pk, {
                    include: [
                        {
                            model: UserAccessModel,
                            as: 'accesses',
                            through: {
                                attributes: [],
                            },
                        },
                    ],
                })
            ).toJSON(); // could be undefined
        }

        return pk;
    }

    /**
     * check if dupliacate email for given edited admin
     * @param {*} ctxBody
     */
    static async checkDuplica(ctxBody) {
        const { idAdmin, email } = ctxBody;
        if (typeof idAdmin === 'undefined') {
            return authTypes._AUTH_ADMIN_ID_NOT_PRESENT;
        }
        if (typeof email === 'undefined') {
            return authTypes._AUTH_ADMIN_EMAIL_NOT_PRESENT;
        }
        const find = await UserModel.findOne({
            where: {
                $col: where(fn('lower', col('email')), fn('lower', email)),
                idUser: {
                    [Op.not]: idAdmin,
                },
                isDeleted: false,
            },
        });

        if (find) {
            return authTypes._AUTH_ADMIN_EMAIL_DUPLICATED;
        }
        return '';
    }
}

module.exports = AuthDAO;
