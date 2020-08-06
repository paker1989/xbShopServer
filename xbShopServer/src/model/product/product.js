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
        productName: {
            type: DataTypes.STRING(512),
            allowNull: false,
            field: 'product_name',
        },
        shortDscp: {
            type: DataTypes.STRING(512 * 2),
            allowNull: true,
            field: 'short_dscp',
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        thumbnail: {
            type: DataTypes.STRING(256),
            allowNull: true,
        },
        detailDscp: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
        isOffshelf: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        totalStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'a_product',
    }
);

Product.belongsToMany(Category, { through: 'l_productCategory', foreignKey: 'productId', timestamps: false });
Category.belongsToMany(Product, { through: 'l_productCategory', foreignKey: 'categoryId' });

Product.hasMany(Gallery, { foreignKey: 'productId', as: 'galleries' });
Gallery.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(ProductSpec, { foreignKey: 'productId', as: 'specs' });
ProductSpec.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = Product;
