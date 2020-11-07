const Router = require('koa-router');

const CustomerDAO = require('../dao/customer.dao');
// const { Resolve } = require('../core/resolve');
const { saveCustomer } = require('../controller/customer/customer.controller');

const router = new Router();

/**
 * /api/v1/category/get
 * @param {*} ctx
 */
// const getCategories = async (ctx) => {
//     const result = await CategoryDAO.getList();
//     Resolve.json(ctx, result);
// };

// router.post('/update', updateCategory);
router.post('/saveCustomer', saveCustomer);

module.exports = router;
