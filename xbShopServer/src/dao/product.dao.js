const ProductModel = require('../model/product/product');
// const { product } = require('../core/cache/cachePrefix');
// const { redisClient } = require('../core/cache/redis');
// const { async, getCacheKey } = require('../core/cache/redisHelper');
const { sequelize } = require('../core/db');
// const { HttpException } = require('../core/httpException');
const ProductSpec = require('../model/product/spec');

// const { zRangeAsync } = async;

class ProductDAO {
    static async save(ctxBody) {
        const { categories, specs, productName, shortDscp, isOffshelf, comment, detailDscp } = ctxBody;
        const _specs = JSON.parse(specs);

        sequelize.transaction(async (t) => {
            const newProduct = await ProductModel.create(
                {
                    productName,
                    shortDscp,
                    comment,
                    detailDscp,
                    isOffshelf,
                },
                {
                    transaction: t,
                }
            );

            await newProduct.setCategories(JSON.parse(categories), { transaction: t });

            _specs.forEach((item) => (item.productId = newProduct.idProduct));
            await ProductSpec.bulkCreate(_specs, { transaction: t });
        });
    }
}

module.exports = ProductDAO;
