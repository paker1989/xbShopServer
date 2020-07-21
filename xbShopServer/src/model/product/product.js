const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../core/db');
const Category = require('../category');
const Gallery = require('./gallery');
const ProductSpec = require('./spec');

class Product extends Model {}

Product.init(
    {
        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productname: {
            type: DataTypes.STRING(512),
            allowNull: false,
            field: 'product_name',
        },
        shortDscp: {
            type: DataTypes.STRING(512 * 2),
            allowNull: true,
            field: 'short_dscp',
        },
        comment: {
            type: DataTypes.TEXT({length: 512*2}),
            allowNull: true,
        },
        thumbnail: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        detailDscp: {
            type: DataTypes.BLOB,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'a_product',
    }
);

Product.hasMany(Category, { through: 'productCategory' });
Category.belongsToMany(Product, { through: 'productCategory' });

Product.hasMany(Gallery, { foreignKey: 'productId' });
Gallery.belongsTo(Product);


Product.hasMany(ProductSpec, { foreignKey: 'productId' });
Gallery.belongsTo(Product);


module.exports = Product;
