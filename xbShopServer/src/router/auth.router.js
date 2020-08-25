const Router = require('koa-router');

// const CategoryDAO = require('../dao/category.dao');
const { Resolve } = require('../core/resolve');
// const { updateCategory } = require('../controller/category/category.controller');

const router = new Router();

/**
 * /api/v1/auth/login
 * @param {*} ctx
 */
const authenticate = async (ctx) => {
    // const result = await CategoryDAO.getList();
    // Resolve.json(ctx, result);
    console.log('authenticating...');
    console.log(ctx.isUnauthenticated());
    if (ctx.isAuthenticated() && ctx.state.user) {
         Resolve.json(ctx, user);
         return;
    }

    

};

const autoLogin = async (ctx) => {};

router.post('/login', authenticate);
router.get('/autoLogin', autoLogin);

module.exports = router;
