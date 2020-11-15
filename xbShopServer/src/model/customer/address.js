const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class Address extends Model {}

// {
//     "idAddress": 42011,
//     "recipient": "reci_user1",
//     "phone": "05650011",
//     "detail": {
//       "addr1": "164 avenue victor hugo",
//       "addr2": "",
//       "city": "Clamart",
//       "postCode": "92140",
//       "country": "fr"
//     },
//     "instruction": "",
//     "default": true
//   },

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
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        postCode: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        detail: {
            type: DataTypes.VIRTUAL,
            get() {
                const keys = ['addr1', 'addr2', 'city', 'postCode', 'country'];
                return {
                    ...keys.map((key) => ({ [key]: this.getDataValue(key) })),
                };
            },
            set(value) {
                // TODO
            },
        },
        instruction: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        default: {
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
