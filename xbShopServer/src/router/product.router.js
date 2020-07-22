const Router = require('koa-router');

const { saveProduct } = require('../controller/product/product.controller');

const router = new Router();

/**
 * api/v1/product/save
 */
router.post('/save', saveProduct);

module.exports = router;
