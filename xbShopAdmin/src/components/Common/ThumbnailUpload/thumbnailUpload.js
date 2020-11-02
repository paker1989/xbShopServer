import React from 'react';
import { Upload, Button, Icon } from 'antd';
import { injectIntl } from 'react-intl';
// import { injectIntl, } from 'react-intl';

const ThumbnailUpload = ({ btnText, intl }) => {
    return (
        <Upload name="logo" action="/upload.do" listType="picture">
            <Button>
                <Icon type="upload" />
                {btnText || intl.formatMessage({ id: 'common.upload.thumbnail' })}
            </Button>
        </Upload>
    );
};

export default injectIntl(ThumbnailUpload);
