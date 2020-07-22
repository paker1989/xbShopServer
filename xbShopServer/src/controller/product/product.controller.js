const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');

/**
 * update category
 * @param {*} ctx
 */
const saveProduct = async (ctx) => {
    console.log('received save product');
    const savedProduct = await ProductDAO.save(ctx.request.body);
    if (true) {
        Resolve.info(ctx, 'save succeed');
    } else {
        throw new HttpException('update category failed');
    }
};

module.exports = {
    saveProduct,
};
