import React from 'react';
import { Upload, Button, Icon, Avatar } from 'antd';
import { injectIntl } from 'react-intl';
// import { injectIntl, } from 'react-intl';
import './thumbnailUpload.scss';

const ThumbnailUpload = ({ title, btnText, shape = 'circle', size = 'large', gender = 'm', intl }) => {
    const _title = title || intl.formatMessage({ id: 'common.upload.title' });
    const _btnText = btnText || intl.formatMessage({ id: 'common.upload.btn.thumbnail' });
    const defaultAvatar = `/static/image/${gender === 'm' ? 'avatar_m' : 'avatar_f'}.png`;
    return (
        <div className="thumbnail-upload-container">
            <div className="upload-title">{_title}</div>
            <div className="upload-preview">
                <Avatar shape={shape} size={size} src={defaultAvatar} />
            </div>
            <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                    <Icon type="upload" />
                    {_btnText}
                </Button>
            </Upload>
        </div>
    );
};

export default injectIntl(ThumbnailUpload);
