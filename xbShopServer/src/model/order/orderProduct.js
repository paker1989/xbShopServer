const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

const OrderModel = require('./order');
const ProductSpec = require('../product/spec');

class OrderProduct extends Model {}

OrderProduct.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        number: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        overwriteUnitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'l_order_product',
        modelName: 'orderProduct',
    }
);

OrderProduct.belongsTo(OrderModel);

OrderProduct.belongsTo(ProductSpec, { as: 'spec', foreignKey: { name: 'specId' } });

module.exports = OrderProduct;
