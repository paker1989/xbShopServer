class HttpException extends Error {
    constructor(msg = 'unknown server error', errno = 10000, statusCode = 501) {
        super();
        this.statusCode = statusCode;
        this.errno = errno;
        this.msg = msg;
    }

    get() {
        return { statusCode: this.statusCode, errno: this.errno, msg: this.msg };
    }
}

module.exports = {
    HttpException,
};
