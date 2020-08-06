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
        console.log(err);
        if (err instanceof HttpException) {
            const { msg, statusCode } = err.get();
            Resolve.info(ctx, msg, statusCode);
        } else {
            Resolve.info(ctx, err.message, 401);
        }
    }
};

module.exports = { errorHandler };
