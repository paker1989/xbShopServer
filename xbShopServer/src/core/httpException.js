class HttpException extends Error {
    constructor(msg = 'unknown server error', statusCode = 501) {
        super();
        this.statusCode = statusCode;
        this.errno = errno;
        this.msg = msg;
    }

    get() {
        return { statusCode: this.statusCode, msg: this.msg };
    }
}

module.exports = {
    HttpException,
};
