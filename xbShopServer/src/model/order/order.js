const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

const CustomerModel = require('../customer/customer');
const AddressModel = require('../customer/address');

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderRef: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING(16),
            allowNull: false,
            defaultValue: 'yuan',
        },
        payAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        customer_note: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        seller_note: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: 1,
            comment: '1=',
        },
    },
    {
        sequelize,
        tableName: 'a_order',
        modelName: 'order',
    }
);

/**
 * ignore createdAt and updatedAt for toJSON
 */
// Customer.prototype.toJSON = function toJSON() {
//     const values = { ...this.get() };

//     delete values.createdAt;
//     delete values.updatedAt;
//     delete values.password;
//     return values;
// };

// CustomerModel.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
Order.belongsTo(CustomerModel, { as: 'customer', foreignKey: 'customerId' });

Order.belongsTo(AddressModel, { as: 'shipAddr', foreignKey: 'shipAddrId' });
Order.belongsTo(AddressModel, { as: 'invoicingAddr', foreignKey: 'invoiceAddrId' });

module.exports = Order;
