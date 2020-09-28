const Router = require('koa-router');

// const { Resolve } = require('../core/resolve');
const {
    login,
    logout,
    getAllUserAccess,
    getAllUserRoles,
    updateAdmin,
} = require('../controller/authentication/auth.controller');

const router = new Router();

const autoLogin = async (ctx) => {};

/*
 * /api/v1/auth
 */
router.post('/login', login);
router.get('/autoLogin', autoLogin);
router.post('/logout', logout);
router.post('/allUserAccess', getAllUserAccess);
router.post('/allUserRoles', getAllUserRoles);
router.post('/updateAdmin', updateAdmin);

module.exports = router;
