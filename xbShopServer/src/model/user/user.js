const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../core/db');
const UserPrefModel = require('./userPref');

class User extends Model {}

User.init(
    {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'a_user',
        modelName: 'user',
    }
);

UserPrefModel.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(UserPrefModel, {
    foreignKey: 'userId',
    as: 'pref',
    onDelete: 'CASCADE',
});
/**
 * ignore createdAt and updatedAt for toJSON
 */
User.prototype.toJSON = function toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;
    delete values.password;
    return values;
};

module.exports = User;
