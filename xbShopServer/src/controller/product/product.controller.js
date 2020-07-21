const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');

/**
 * update category
 * @param {*} ctx
 */
const saveProduct = async (ctx) => {
    const updated = await ProductDAO.update(ctx.request.body);
    if (updated) {
        ctx.body = Resolve.json(updated);
        ctx.
    } else {
        throw new HttpException('update category failed');
    }
};

module.exports = {
    saveProduct,
};
