/* 
    File upload 
 */
const fs = require('fs');
const path = require('path');
// const dateFormat = require('../utils/dateFormat.js');

const config = require('../config/config');

const { upload } = config;
// Create a file directory
const mkdirFile = (path) => {
    let pathList = path.split('/');
    let fileDir = '';
    pathList.forEach((i) => {
        if (i) {
            fileDir += '/' + i;
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, (err) => {
                    LogFile.info('Create failure', err);
                    return;
                });
            }
        }
    });
};

// Save file
const saveFile = async (file, savePath) => {
    return new Promise((resolve, reject) => {
        const render = fs.createReadStream(file);
        // Create a write stream
        const upStream = fs.createWriteStream(savePath);
        render.pipe(upStream);
        upStream.on('finish', () => {
            resolve(path);
        });
        upStream.on('error', (err) => {
            reject(err);
        });
    });
};

/**
 * File upload
 * ps Generate file name SKD_date
 *     File paths are stored according to year and month
 */
const uploadImg1 = async (files) => {
    var time = Date.parse(new Date());
    let date = dateFormat.dateFormat(time, 'yyyyMMddhhmmss');
    let file = files;
    let fileName = 'SKD_ ' + upload.UPLOAD + upload.IMAGE; //Upload and save directory
    let fileYear = date.substring(4, 8) + '/' + date.substring(8, 10);
    let tail = file.name == 'blob' ? 'png' : file.name.split('.').pop();
    let filePath = path.join(fileName, fileYear, date + '.' + tail); //Stitching file names according to time
    await mkdirFile(fileName + fileYear); //Create a file directory
    await saveFile(file.path, filePath)
        .then((su) => {
            let uplaod_img = su.substring(upload.UPLOAD.length, su.length);
            ctx.body = {
                error_code: 10000,
                error_message: 'Successful upload of files',
                realName: uplaod_img,
            };
        })
        .catch((err) => {
            ctx.body = {
                error_code: 20008,
                error_message: 'Failed to upload file!',
            };
        });
};

const uploadImg = async (galleries) => {
    galleries.map(async (item) => {
        const dir = path.resolve(__dirname, '../../static/upload/gallery');
        const savePath = path.resolve(dir, `${Date.now()}.png`);
        await mkdirFile(dir);
        await saveFile(item.file, savePath);
    });
};

module.exports = {
    uploadImg,
};
