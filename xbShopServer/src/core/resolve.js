class Resolve {
    static info(ctx, msg = 'success', statusCode = 200) {
        ctx.status = statusCode;
        ctx.message = msg;
        ctx.data = '';
    }

    static json(ctx, data, msg = 'success', statusCode = 200) {
        // console.log('resolve json');
        ctx.status = statusCode;
        ctx.message = msg;
        ctx.body = data;
    }
}

module.exports = {
    Resolve,
};
