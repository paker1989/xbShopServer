class Resolve {
    static info(msg = 'success', errno = 0, statusCode = 200) {
        return {
            msg,
            statusCode,
            errno,
        };
    }

    static json(data, msg = 'success', errno = 0, statusCode = 200) {
        return {
            statusCode,
            msg,
            errno,
            data,
        };
    }
}

module.exports = {
    Resolve,
};
