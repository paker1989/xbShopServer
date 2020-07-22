class Resolve {
    static info(ctx, msg = 'success', statusCode = 200) {
        ctx.status = statusCode;
        ctx.message = msg;
    }

    static json(ctx, data, msg = 'success', statusCode = 200) {
        ctx.status = statusCode;
        ctx.message = msg;
        ctx.body = data;
    }
}

module.exports = {
    Resolve,
};
