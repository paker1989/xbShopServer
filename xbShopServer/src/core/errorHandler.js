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
        // console.log('captured by errorHandler');
        if (err instanceof HttpException) {
            const { msg, errno, statusCode } = err.get();
            ctx.body = Resolve.info(msg, errno, statusCode);
        } else {
            ctx.body = Resolve.info(err.message, 10000, 401);
        }
    }
};

module.exports = { errorHandler };
