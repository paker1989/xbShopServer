const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class Gallery extends Model {}

Gallery.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'gallery',
        modelName: 'gallery',
    }
);

module.exports = Gallery;
