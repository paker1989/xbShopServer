const { Resolve } = require('./resolve');
const { HttpException } = require('./httpException');
/**
 * @param {*} ctx
 * @param {*} next
 */
const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log('captured by errorHandler');
        console.log(err.message);
        if (err instanceof HttpException) {
            const { msg, statusCode } = err.get();
            ctx.body = Resolve.info(ctx, msg, statusCode);
        } else {
            ctx.body = Resolve.info(ctx, err.message, 401);
        }
    }
};

module.exports = { errorHandler };
