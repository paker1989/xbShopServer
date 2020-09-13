import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

const defaultLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15, offset: 1 },
    },
};
/**
 * @param {*} showGenerate: 是否提供密码生成
 * @param {*} isRepeat: 是否重复确认密码
 */
const PasswordConfirmer = ({
    intl,
    isRepeat = true,
    password,
    onChange,
    showGenerate = false,
    layout = defaultLayout,
}) => {
    const { labelCol, wrapperCol } = layout;
    return (
        <div className="pwd-confirmer">
            <Row className="ant-form-item">
                <Col {...labelCol} className="ant-form-item-label">
                    <FormattedMessage id="common.password" />
                </Col>
                <Col {...wrapperCol} className="ant-form-item-control">
                    <Input
                        style={{ width: 200 }}
                        type="password"
                        placeholder={intl.formatMessage({ id: 'common.password' })}
                    />
                    {showGenerate && (
                        <Button style={{ marginLeft: 10 }}>
                            <FormattedMessage id="common.generate.pwd" />
                        </Button>
                    )}
                </Col>
            </Row>
            {isRepeat && (
                <Row>
                    <Col {...labelCol} className="ant-form-item-label">
                        <FormattedMessage id="common.password.repeat" />
                    </Col>
                    <Col {...wrapperCol} className="ant-form-item-control">
                        <Input
                            style={{ width: 200 }}
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password.repeat' })}
                        />
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default injectIntl(PasswordConfirmer);
