import React from 'react';
import { Row, Input, Button, Form } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import addAdminMeta from '../../../static/data/componentMeta/user/addAdminMeta';
import { generatePwd as genratePwdFn } from '../../../utils/data.helper';

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

    const generatePwd = () => {
        const { pwdLength } = addAdminMeta.adminGenerator;
        const newPwd = genratePwdFn(pwdLength);
        form.setFieldsValue({
            passwordRepeat: newPwd,
            password: newPwd,
        });
    };

    return (
        <div className="pwd-confirmer">
            <Form.Item
                label={intl.formatMessage({ id: 'common.password' })}
                extra={intl.formatMessage({ id: 'common.password.length.required' })}
            >
                <Row>
                    {getFieldDecorator(
                        'password',
                        validators.password
                    )(
                        <Input.Password
                            style={{ width: 250 }}
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password' })}
                        />
                    )}
                    {showGenerate && (
                        <Button style={{ marginLeft: 10 }} onClick={generatePwd}>
                            <FormattedMessage id="common.generate.pwd" />
                        </Button>
                    )}
                </Row>
            </Form.Item>
            {isRepeat && (
                <Form.Item label={intl.formatMessage({ id: 'common.password.repeat' })}>
                    {getFieldDecorator(
                        'passwordRepeat',
                        validators.passwordRepeat
                    )(
                        <Input.Password
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
