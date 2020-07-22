const CategoryDAO = require('../../dao/category.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');
/**
 * update category
 * @param {*} ctx
 */
const updateCategory = async (ctx) => {
    const updated = await CategoryDAO.update(ctx.request.body);
    if (updated) {
        Resolve.json(ctx, updated);
    } else {
        throw new HttpException('update category failed');
    }
};

module.exports = {
    updateCategory,
};
