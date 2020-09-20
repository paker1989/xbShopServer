const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

/**
 * user accessible page
 */
class UserAccess extends Model {}

UserAccess.init(
    {
        idUserAccess: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'c_useraccess',
        timestamps: false,
    }
);

module.exports = UserAccess;
