const Router = require('koa-router');

const category = require('./category.router');
const product = require('./product.router');
const auth = require('./auth.router');

const router = new Router({ prefix: '/api/v1' });

router.use('/category', category.routes(), category.allowedMethods());
router.use('/product', product.routes(), product.allowedMethods());
router.use('/auth', auth.routes(), auth.allowedMethods());

module.exports = router;
