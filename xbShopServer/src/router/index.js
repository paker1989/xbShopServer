const Router = require('koa-router');
const category = require('./category.router');
const product = require('./product.router');

const router = new Router({ prefix: '/api/v1' });

router.use('/category', category.routes(), category.allowedMethods());
router.use('/product', product.routes(), product.allowedMethods());

module.exports = router;
