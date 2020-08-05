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
}

module.exports = ProductDAO;
