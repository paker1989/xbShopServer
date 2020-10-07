const { sequelize } = require('../core/db');

const UserModel = require('../model/user/user');
const UserPrefModel = require('../model/user/userPref');
const UserRoleModel = require('../model/user/userRole');
const UserAccessModel = require('../model/user/userAccess');

const encryptHelper = require('../core/encryptionHelper');
const variables = require('../core/authHelper');

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
            where: {
                isDeleted: 0,
            },
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
        const { email, phoneNumber, idRole, defaultPage, isActive, password, idAdmin = -1 } = ctxBody;
        const encryptedPassword = encryptHelper.bcryptHashSync(password);

        if (Number(idAdmin) === -1) {
            pk = await sequelize.transaction(async (t) => {
                const newAdmin = await UserModel.create(
                    {
                        username: email,
                        password: encryptedPassword,
                        phoneNumber,
                        email,
                        // isActive,
                    },
                    {
                        transaction: t,
                    }
                );

                const userPref = await UserPrefModel.create(
                    {
                        userroleId: Number(idRole),
                        userAccessId: Number(defaultPage),
                        userId: newAdmin.idUser,
                    },
                    { transaction: t }
                );

                // set categories
                await newAdmin.setPref(userPref, { transaction: t });

                return newAdmin.idUser;
            });
        }

        if (pk) {
            return AuthDAO.findUserByPK(pk);
        }
        return pk; // undefined
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

        if (Number(idRole) === -1) {
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
                await newRole.setAccesses(/* JSON.parse(categories) */ accesses, { transaction: t });

                return newRole.idRole;
            });
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
}

module.exports = AuthDAO;
