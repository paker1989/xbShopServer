const Router = require('koa-router');
const CategoryDAO = require('../dao/category.dao');
const { Resolve } = require('../core/resolve');

const router = new Router();

/**
 * /api/v1/category/update
 * @param {*} ctx
 * @param {*} next
 */
const updateCategory = async (ctx) => {
    const result = await CategoryDAO.getList();
    console.log(result);
    ctx.body = Resolve.json(result);
};

const getCategories = async (ctx) => {
    const result = await CategoryDAO.getList();
    ctx.body = Resolve.json(result);
};

router.post('/update', updateCategory);
router.get('/get', getCategories);

module.exports = router;
