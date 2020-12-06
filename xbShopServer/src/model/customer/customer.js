const { Sequelize, Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');
const Address = require('./address');

class Customer extends Model {}

Customer.init(
    {
        idCustomer: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pseudo: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('m', 'f'),
            // type: DataTypes.TINYINT({ length: 2 }),
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        registerDt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        registerDtStr: {
            type: DataTypes.VIRTUAL,
            get() {
                const registerDt = this.getDataValue('registerDt');
                if (registerDt) {
                    return new Date(registerDt).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                }
                return '';
            },
        },
        lastAccessDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'a_customer',
        modelName: 'customer',
    }
);

/**
 * ignore createdAt and updatedAt for toJSON
 */
Customer.prototype.toJSON = function toJSON() {
    const values = { ...this.get() };

    delete values.createdAt;
    delete values.updatedAt;
    delete values.password;
    return values;
};

Customer.hasMany(Address, { foreignKey: 'customerId', as: 'addresses' });
Address.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Customer;
