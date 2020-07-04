import React, { forwardRef } from 'react';
import { Upload, Icon, message } from 'antd';

import { selectFileImage } from '../../../../utils/upload.helper';
const extraData = {}; // todo

const GalleryUpload = (props, ref) => {
    const { galleries } = props;

    const uploadProps = {
        action: '/',
        listType: 'picture-card',
        accept: 'image/x-png,image/jpeg',
        withCredentials: true,
        multiple: true,
        data: extraData,
        // onPreview: (file) => {
        //     // todo
        // },
        onChange: async ({ file, fileList }) => {
            // console.log('onChange');
            const index = fileList.findIndex((item) => item.uid === file.uid);
            if (index !== -1) {
                fileList.splice(index, 1);
                const thumb = await selectFileImage(file.originFileObj || file);
                /* eslint-disable */
                file.url = thumb;
                file.thumbUrl = thumb;
                /* eslint-enable */
                fileList.push(file);
                const handleChange = props.onChange;
                handleChange(fileList);
            }
        },
        beforeUpload: (file) => {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error('Image must smaller than 5MB!');
            }
            return false;
        },
        // transformFile: (file) => {
        //     console.log('transformed file');
        //     // to check if still transform file when beforeUpload is return false
        //     return new Promise((resolve) => {
        //         resolve(file);
        //     });
        // },
    };

    return (
        <Upload fileList={galleries} {...uploadProps} ref={ref}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
        </Upload>
    );
};

export default forwardRef(GalleryUpload);
