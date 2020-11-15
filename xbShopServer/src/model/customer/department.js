const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../core/db');
const CityModel = require('./city');

class Department extends Model {}

Department.init(
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
    },
    {
        sequelize,
        tableName: 'departments',
        modelName: 'department',
        timestamps: false,
    }
);

Department.hasMany(CityModel, { foreignKey: 'department_code', sourceKey: 'code', as: 'cities' });
CityModel.belongsTo(Department, { foreignKey: 'department_code', targetKey: 'code' });

module.exports = Department;
