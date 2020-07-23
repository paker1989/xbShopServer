import React, { forwardRef, useState } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { selectFileImage } from '../../../../utils/upload.helper';
import { productGenerator } from '../../../../static/data/componentMeta/product/addProductMeta';

import './galleryUpload.scss';

const extraData = {}; // todo

const GalleryUpload = (props, ref) => {
    const { maxGalleries, maxOriginFileSize } = productGenerator;
    // const { galleries } = props;
    const [localGalleries, setLocalGalleries] = useState([...props.galleries]);
    // const [local]
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const compressOptions = useSelector((state) => state.meta.imageReducers.compress.gallery);

    const uploadProps = {
        action: '/',
        listType: 'picture-card',
        accept: 'image/x-png,image/jpeg',
        withCredentials: true,
        multiple: true,
        data: extraData,
        onPreview: (file) => {
            setPreviewImage(file.url || file.thumbUrl);
            setPreviewVisible(true);
        },
        onRemove: (file) => {
            const index = galleries.findIndex((item) => item.uid === file.uid);
            galleries.splice(index, 1);
            props.onChange(galleries);
            return true;
        },
        onChange: async ({ file, fileList }) => {
            // 只上传前maxGalleries张
            /* eslint-disable */
            // fileList = fileList.slice(-maxGalleries);
            /* eslint-enable */
            // console.log('before compress');
            // console.log(galleries);
            // const _galleries = galleries;
            // const index = galleries.findIndex((item) => item.uid === file.uid);
            // console.log('index = ' + index);
            // if (index !== -1) {
            //     console.log('return');
            //     return;
            // }
            // console.log('continue');

            // console.log(file);
            // console.log(file.uid);
            if (fileList.length > maxGalleries) {
                message.error('只能上传最多3张图片');
                return;
            }

            console.log('gallery length = ' + galleries.length);
            if (galleries.length >= maxGalleries) {
                galleries.shift();
            }

            // const index = fileList.findIndex((item) => item.uid === file.uid);
            // fileList.splice(index, 1);
            const thumb = await selectFileImage(file.originFileObj || file, maxOriginFileSize, compressOptions);
            /* eslint-disable */
            file.url = thumb;
            file.thumbUrl = thumb;
            /* eslint-enable */
            console.log('push file');
            console.log(file);
            galleries.push(file);
            const handleChange = props.onChange;
            handleChange(galleries);
        },

        beforeUpload: () => {
            // const isLt5M = file.size / 1024 / 1024 < 5;
            // if (!isLt5M) {
            //     message.error('上传的图片需要小于5M!');
            // }
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

    const handleCancel = () => {
        setPreviewImage('');
        setPreviewVisible(false);
    };

    return (
        <div className="gallery-upload">
            <Upload fileList={localGalleries} {...uploadProps} ref={ref}>
                {localGalleries.length < maxGalleries ? (
                    <p className="gallery-upload-body">
                        <Icon type="plus" />
                        <span>
                            <FormattedMessage id="product.gallery.clickadd" />
                        </span>
                    </p>
                ) : null}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="预览" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default forwardRef(GalleryUpload);
