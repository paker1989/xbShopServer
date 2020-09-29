const Router = require('koa-router');
const { Resolve } = require('../core/resolve');

const {
    login,
    logout,
    getAllUserAccess,
    getAllUserRoles,
    updateAdmin,
    allAdmins,
} = require('../controller/authentication/auth.controller');

const router = new Router();

const autoLogin = async (ctx) => {};

const authMiddleware = async (ctx, next) => {
    if (ctx.isAuthenticated() && ctx.state.user) {
        next();
    } else {
        Resolve.info(ctx, 'please authenticate before calling this API.');
    }
};

/*
 * /api/v1/auth
 */
router.post('/login', login);
router.get('/autoLogin', autoLogin);
router.post('/logout', logout);
router.post('/allUserAccess', authMiddleware, getAllUserAccess);
router.post('/allUserRoles', authMiddleware, getAllUserRoles);
router.post('/updateAdmin', authMiddleware, updateAdmin);
router.post('/allAdmins', authMiddleware, allAdmins);

module.exports = router;
