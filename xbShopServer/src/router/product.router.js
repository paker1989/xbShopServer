const Router = require('koa-router');

const { saveProduct, fetchList } = require('../controller/product/product.controller');

const router = new Router();

/**
 * api/v1/product/save
 */
router.post('/save', saveProduct);
/**
 * api/v1/product/fetchList
 */
router.post('/fetchList', fetchList);

module.exports = router;
