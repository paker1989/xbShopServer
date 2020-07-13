const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../core/db');
const Category = require('../category');
const Gallery = require('./gallery');

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productname: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        shortDscp: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'product',
        modelName: 'product',
    }
);

Product.hasMany(Category, { through: 'productCategory' });
Category.belongsToMany(Product, { through: 'productCategory' });

Product.hasMany(Gallery, { foreignKey: 'productId' });
Gallery.belongsTo(Product);

module.exports = Product;
