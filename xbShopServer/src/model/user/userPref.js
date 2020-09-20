const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');
const UserRoleModel = require('./userRole');
const UserAccessModel = require('./userAccess');

class UserPref extends Model {}

UserPref.init(
    {
        idUserPref: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        sequelize,
        tableName: 'l_userpref',
        timestamps: false,
    }
);

UserPref.belongsTo(UserRoleModel, { foreignKey: 'userroleId', as: 'role' });
UserPref.belongsTo(UserAccessModel, { foreignKey: 'userAccessId', as: 'indexPage' });

module.exports = UserPref;
