module.exports = {
    environnement: 'dev',
    port: 3000,
    database: {
        dialect: 'mysql',
        dbName: 'xbshop',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        totalRetryTime: 1000 * 60 * 5, // 5 mins
        maxAttempt: 5,
    },
    //koa-body config
    formData: {
        formLimit: '2mb',
        multipart: true,
        formidable: {
            maxFileSize: 3 * 3 * 1024 * 1024,
            keepExtensions: true,
        },
    },
    upload: {
        UPLOAD: '/upload',
        IMAGE: '/image/',
        FILE: '/file/',
        MAXFILESIZE: 200 * 1024 * 1024, //Upload file size
    };
};
