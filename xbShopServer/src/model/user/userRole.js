const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../core/db');
const UserAccess = require('./userAccess');

class UserRole extends Model {}

UserRole.init(
    {
        idRole: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'a_userrole',
        modelName: 'userRole',
        timestamps: false,
    }
);

UserRole.belongsToMany(UserAccess, {
    through: 'l_roleaccess',
    foreignKey: 'roleId',
    as: 'accesses',
    timestamps: false,
});
UserAccess.belongsToMany(UserRole, { through: 'l_roleaccess', foreignKey: 'accessId' });

module.exports = UserRole;
