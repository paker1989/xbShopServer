const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const md5sum = crypto.createHash;

const { getFormattedDate } = require('../core/dateHelper');

module.exports = {
    basePath: 'http://localhost',
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
    auth: {
        bcryptCost: 8,
        appKeys: ['xb_server_app'],
        session: {
            key: 'xb_server',
            maxAge: 86400000,
            autoCommit: true,
            overwrite: true,
            httpOnly: false,
            signed: true,
            rolling: false,
            renew: false,
            secure: true,
            sameSite: null,
        },
    },
    // koa-body config
    formData: {
        formLimit: '2mb',
        multipart: true,
        formidable: {
            maxFileSize: 3 * 3 * 1024 * 1024,
            keepExtensions: true,
            uploadDir: path.join(__dirname, '../../static/upload/img'),
            onFileBegin: (name, file) => {
                const { year, month, day } = getFormattedDate(new Date());
                const parsed = path.parse(file.name);
                const dir = path.resolve(__dirname, '../../static/upload/img', `${year}/${month}/${day}`);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                file.name = `${md5sum('md5').update(parsed.name).digest('hex')}_${year}${month}${day}${parsed.ext}`;
                file.path = `${dir}/${file.name}`;
            },
        },
    },
};
