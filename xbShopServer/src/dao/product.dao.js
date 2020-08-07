const { Op } = require('sequelize');
const ProductModel = require('../model/product/product');
const { sequelize } = require('../core/db');

const ProductSpec = require('../model/product/spec');
const Gallery = require('../model/product/gallery');

class ProductDAO {
    static async save(ctxBody) {
        let pk;
        const {
            categories,
            specs,
            productName,
            shortDscp,
            isOffshelf,
            comment,
            detailDscp,
            galleryPaths,
            totalStock,
            idProduct = -1,
        } = ctxBody;
        const _specs = JSON.parse(specs);

        // save case
        if (idProduct === '-1') {
            pk = await sequelize.transaction(async (t) => {
                const newProduct = await ProductModel.create(
                    {
                        productName,
                        shortDscp,
                        comment,
                        detailDscp,
                        isOffshelf,
                        totalStock,
                        thumbnail: galleryPaths[0].url,
                    },
                    {
                        transaction: t,
                    }
                );

                // set categories
                await newProduct.setCategories(JSON.parse(categories), { transaction: t });

                // set specs
                _specs.forEach((item) => {
                    item.productId = newProduct.idProduct;
                });
                await ProductSpec.bulkCreate(_specs, { transaction: t });

                // set galleries
                galleryPaths.forEach((item) => {
                    item.productId = newProduct.idProduct;
                });
                await Gallery.bulkCreate(galleryPaths, { transaction: t });

                return newProduct.idProduct;
            });
        }

        return (
            await ProductModel.findByPk(pk, {
                include: ['categories', 'specs', 'galleries'],
            })
        ).toJSON();
    }

    /**
     * return all sorted product ids
     * @param {*} sortedCretia
     * @param {*} sortedOrder
     */
    static async fetchProductIds(sortedCretia, sortedOrder) {
        // console.log(sortedCretia);
        // console.log(sortedOrder);
        let orderStatement;
        if (sortedCretia === 'NA' || sortedOrder === 'NA') {
            orderStatement = [];
        } else {
            switch (sortedCretia) {
                case 'stock':
                    orderStatement = ['totalStock', sortedOrder];
                    break;
                default:
                    orderStatement = [sortedCretia, sortedOrder];
                    break;
            }
        }

        const sortedIds = (
            await ProductModel.findAll({
                attributes: ['idProduct'],
                where: {
                    isDeleted: {
                        [Op.eq]: 0,
                    },
                },
                order: orderStatement.length === 0 ? [] : [orderStatement],
            })
        ).map((u) => u.get('idProduct'));
        return sortedIds;
    }

    /**
     * fetch product object for list display
     * @param {*} idProduct
     */
    static async fetchProductMeta(idProduct) {
        if (idProduct < 0) {
            return null;
        }
        return (
            await ProductModel.findByPk(idProduct, {
                include: [
                    {
                        model: ProductSpec,
                        as: 'specs',
                        where: {
                            isDeleted: {
                                [Op.eq]: 0,
                            },
                        },
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                ],
                attributes: {
                    exclude: ['shortDscp', 'detailDscp', 'comment', 'createdAt', 'updatedAt'],
                },
                where: {
                    isDeleted: {
                        [Op.eq]: 0,
                    },
                },
            })
        ).toJSON();
    }
}

module.exports = ProductDAO;
