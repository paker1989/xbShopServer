const UserModel = require('../model/user/user');
const UserPrefModel = require('../model/user/userPref');
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
                        attributes: { exclude: ['userprefId'] },
                    },
                ],
            });
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
