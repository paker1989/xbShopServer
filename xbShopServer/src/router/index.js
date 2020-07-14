const Router = require('koa-router');
const category = require('./category.router');

const router = new Router({ prefix: '/api/v1' });

router.use('/category', category.routes(), category.allowedMethods());

module.exports = router;
