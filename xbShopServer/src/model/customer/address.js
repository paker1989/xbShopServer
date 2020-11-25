const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class Address extends Model {}

Address.init(
    {
        idAddress: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        recipient: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        addr1: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
        },
        addr2: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
        },
        city: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: -1,
        },
        // departmentId: {
        //     type: DataTypes.INTEGER(8),
        //     allowNull: false,
        //     defaultValue: -1,
        // },
        // regionId: {
        //     type: DataTypes.INTEGER(8),
        //     allowNull: false,
        //     defaultValue: -1,
        // },
        region: {
            type: DataTypes.STRING(128),
            allowNull: false,
            defaultValue: '',
        },
        postCode: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        countryCode: {
            // code
            type: DataTypes.STRING(16),
            allowNull: false,
            // defaultValue: 'fr',
        },
        // detail: {
        //     type: DataTypes.VIRTUAL,
        //     get() {
        //         const keys = ['addr1', 'addr2', 'city', 'postCode', 'country'];
        //         return {
        //             ...keys.map((key) => ({ [key]: this.getDataValue(key) })),
        //         };
        //     },
        //     set(value) {
        //         // TODO
        //     },
        // },
        instruction: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'a_address',
        modelName: 'address',
        timestamps: false,
    }
);

/**
 * ignore createdAt and updatedAt for toJSON
 */
// Address.prototype.toJSON = function toJSON() {
//     const values = { ...this.get() };
//     return values;
// };

module.exports = Address;
