const CategoryDAO = require('../../dao/category.dao');
const {Resolve}  = require('../../core/resolve');
/**
 * update category
 * @param {*} ctx
 */
const updateCategory = async (ctx) => {
      const updated = await CategoryDAO.update(ctx.request.body);
      console.log(updated);
      if (updated) {
        ctx.body = Resolve.json(updated);
      } else {
          throw new Error('update category failed');
      }

    //   throw new Error('update failed');
};

module.exports = {
    updateCategory,
};
