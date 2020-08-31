const Router = require('koa-router');

// const CategoryDAO = require('../dao/category.dao');
const { Resolve } = require('../core/resolve');
const { login } = require('../controller/authentication/auth.controller');
// const { updateCategory } = require('../controller/category/category.controller');

const router = new Router();

const autoLogin = async (ctx) => {};

/*
 * /api/v1/auth/login
 */
router.post('/login', login);
router.get('/autoLogin', autoLogin);

module.exports = router;
