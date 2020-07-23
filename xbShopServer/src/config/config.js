const path = require('path');
const fs = require('fs');

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
    // koa-body config
    formData: {
        formLimit: '2mb',
        multipart: true,
        formidable: {
            maxFileSize: 3 * 3 * 1024 * 1024,
            keepExtensions: true,
            uploadDir: path.resolve(__dirname, '../../static/upload/img'),
            onFileBegin: (name, file) => {
                const parsed = path.parse(file.name);
                const dir = path.join(__dirname, '../../static/upload/img', 'data');
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                file.name = `${parsed.name}_${Date.now()}${parsed.ext}`;
                file.path = `${dir}/${parsed.name}_${Date.now()}${parsed.ext}`;
            },
        },
    },
    upload: {
        UPLOAD: '/upload',
        IMAGE: '/image/',
        FILE: '/file/',
        MAXFILESIZE: 200 * 1024 * 1024, // Upload file size
    },
};
