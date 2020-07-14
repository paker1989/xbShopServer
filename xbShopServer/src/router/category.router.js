const Router = require('koa-router');

const router = new Router();

const addOrEditCategory = async (ctx, next) => {
    console.log(ctx);
    console.log('add or edit category');
    ctx.body = 'edit succeed';
};

router.post('/', addOrEditCategory);

module.exports = router;
