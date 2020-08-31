const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class UserPref extends Model {}

UserPref.init(
    {
        idUserPref: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        indexPage: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'l_userpref',
        timestamps: false,
    }
);

module.exports = UserPref;
