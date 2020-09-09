const Router = require('koa-router');

// const { Resolve } = require('../core/resolve');
const { login, logout } = require('../controller/authentication/auth.controller');

const router = new Router();

const autoLogin = async (ctx) => {};

/*
 * /api/v1/auth/login
 */
router.post('/login', login);
router.get('/autoLogin', autoLogin);
router.post('/logout', logout);

module.exports = router;
