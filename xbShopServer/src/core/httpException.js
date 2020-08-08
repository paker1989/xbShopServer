class HttpException extends Error {
    constructor(msg = 'unknown server error', statusCode = 400) {
        super();
        this.statusCode = statusCode;
        this.msg = msg;
    }

    get() {
        return { statusCode: this.statusCode, msg: this.msg };
    }
}

module.exports = {
    HttpException,
};
