const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');

class City extends Model {}

City.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        inseeCode: {
            type: DataTypes.STRING(5),
            field: 'insee_code',
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(5),
            field: 'zip_code',
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        displayName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.getDataValue('zipCode')} - ${this.getDataValue('name')}`;
            },
        },
    },
    {
        sequelize,
        tableName: 'cities',
        modelName: 'city',
        timestamps: false,
    }
);

module.exports = City;
