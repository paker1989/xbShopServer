const UserModel = require('../model/user/user');
const UserPrefModel = require('../model/user/userPref');
const UserRoleModel = require('../model/user/userRole');
const UserAccessModel = require('../model/user/userAccess');

const encryptHelper = require('../core/encryptionHelper');
const variables = require('../core/authHelper');

class AuthDAO {
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
            const completedUser = await UserModel.findByPk(finded.get('idUser'), {
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

            return {
                user: completedUser.toJSON(),
            };
        }
        return {
            error: variables._PASSWORD_ERROR,
        };
    }
}

module.exports = AuthDAO;
