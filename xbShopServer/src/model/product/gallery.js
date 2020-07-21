const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class Gallery extends Model {}

Gallery.init(
    {
        idGallery: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
    },
    {
        sequelize,
        tableName: 'a_gallery',
    }
);

module.exports = Gallery;
