const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class ProductSpec extends Model {}

ProductSpec.init(
    {
        idProductSpec: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sku: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        },
        spec: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stockNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'a_productSpec',
    }
);

module.exports = Gallery;
