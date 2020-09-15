import React from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

/**
 * @param {*} showGenerate: 是否提供密码生成
 * @param {*} isRepeat: 是否重复确认密码
 */
const PasswordConfirmer = ({
    intl,
    form,
    validators,
    isRepeat = true,
    password,
    onChange,
    showGenerate = false,
    // layout = defaultLayout,
}) => {
    const { getFieldDecorator } = form;
    return (
        <div className="pwd-confirmer">
            <Form.Item label={intl.formatMessage({ id: 'common.password' })}>
                {getFieldDecorator(
                    'password',
                    validators.password
                )(
                    <Row>
                        <Input
                            style={{ width: 250 }}
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password' })}
                        />
                        {showGenerate && (
                            <Button style={{ marginLeft: 10 }}>
                                <FormattedMessage id="common.generate.pwd" />
                            </Button>
                        )}
                    </Row>
                )}
            </Form.Item>
            {isRepeat && (
                <Form.Item label={intl.formatMessage({ id: 'common.password.repeat' })}>
                    {getFieldDecorator(
                        'passwordRepeat',
                        validators.passwordRepeat
                    )(
                        <Input
                            style={{ width: 250 }}
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password.repeat' })}
                        />
                    )}
                </Form.Item>
            )}
        </div>
    );
};

export default injectIntl(PasswordConfirmer);
