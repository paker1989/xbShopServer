const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');
const DepartmentModel = require('./department');

class Region extends Model {}

Region.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(3),
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
        country: {
            type: DataTypes.STRING(16),
            allowNull: false,
            field: 'country_code',
        },
    },
    {
        sequelize,
        tableName: 'regions',
        modelName: 'region',
        timestamps: false,
    }
);

Region.hasMany(DepartmentModel, { foreignKey: 'region_code', sourceKey: 'code', as: 'departments' });
DepartmentModel.belongsTo(Region, { foreignKey: 'region_code', targetKey: 'code' });

module.exports = Region;
