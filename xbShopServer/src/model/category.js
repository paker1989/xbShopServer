const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../core/db');

class Category extends Model {}

Category.init(
    {
        idCategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'category',
        modelName: 'category',
    }
);

module.exports = Category;
