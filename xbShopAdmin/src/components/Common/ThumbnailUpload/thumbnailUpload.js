import React, { forwardRef } from 'react';
import { Upload, Button, Icon, Avatar } from 'antd';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { selectFileImage } from '../../../utils/upload.helper';
import { customerGenerator } from '../../../static/data/componentMeta/user/addCustomerMeta';

import './thumbnailUpload.scss';

const { maxOriginFileSize } = customerGenerator;

const ThumbnailUpload = (
    { thumbnails = [], title, btnText, shape = 'circle', size = 'large', gender = 'm', intl, ...otherProps },
    ref
) => {
    const _title = title || intl.formatMessage({ id: 'common.upload.title' });
    const _btnText = btnText || intl.formatMessage({ id: 'common.upload.btn.thumbnail' });

    const defaultAvatar = `/static/image/${gender === 'm' ? 'avatar_m' : 'avatar_f'}.png`;
    const avatarLink = thumbnails.length > 0 ? thumbnails[0].url : defaultAvatar;

    const compressOptions = useSelector((state) => state.meta.imageReducers.compress.thumbnail);

    const uploadProps = {
        action: '/',
        listType: 'picture',
        accept: 'image/x-png,image/jpeg',
        withCredentials: true,
        multiple: false,
        onChange: async ({ file }) => {
            /* eslint-disable */
            const { thumb, fileObj } = await selectFileImage(
                file.originFileObj || file,
                maxOriginFileSize,
                compressOptions
            );
            file.url = thumb;
            file.thumbUrl = thumb;
            file.compressed = fileObj;
            /* eslint-enable */

            const handleChange = otherProps.onChange;
            handleChange([file]);
        },

        beforeUpload: () => {
            return false;
        },
    };

    return (
        <div className="thumbnail-upload-container" ref={ref}>
            <div className="upload-title">{_title}</div>
            <div className="upload-preview">
                <Avatar shape={shape} size={size} src={avatarLink} />
            </div>
            <Upload name="logo" fileList={[]} {...uploadProps}>
                <Button>
                    <Icon type="upload" />
                    {_btnText}
                </Button>
            </Upload>
        </div>
    );
};

export default injectIntl(forwardRef(ThumbnailUpload));
