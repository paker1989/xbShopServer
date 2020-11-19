/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Row, Input, Button, Form } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { generatePwd as generatePwdFn } from '../../../utils/data.helper';
import selfValidator from './passwordValidator';
/**
 * @param {*} showGenerate: 是否提供密码生成
 * @param {*} isRepeat: 是否重复确认密码
 */
const Core = ({
    intl,
    form,
    pwdLength = 6,
    validators = selfValidator(intl, form),
    passwordMode = 'input', // create, edit, standby, input
    setPasswordMode,
    showGenerate = false,
}) => {
    const { getFieldDecorator } = form;

    const showRepeat = passwordMode === 'edit' || passwordMode === 'create';

    const generatePwd = () => {
        const newPwd = generatePwdFn(pwdLength);
        form.setFieldsValue({
            passwordRepeat: newPwd,
            password: newPwd,
        });
    };

    const resetPwd = () => {
        setPasswordMode('edit');
        form.setFieldsValue({
            passwordRepeat: '',
            password: '',
        });
    };

    const cancelResetPwd = () => {
        setPasswordMode('standby');
        form.setFieldsValue({
            password: 'xbshop_placeholder',
        });
    };

    return (
        <div className="pwd-confirmer">
            <Form.Item
                label={intl.formatMessage({ id: 'common.password' })}
                extra={showRepeat ? intl.formatMessage({ id: 'common.password.length.required' }) : null}
            >
                <Row>
                    {getFieldDecorator(
                        'password',
                        validators.password
                    )(
                        <Input.Password
                            disabled={passwordMode === 'standby'}
                            className="xb-form-input"
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password' })}
                        />
                    )}
                    {showGenerate && showRepeat && (
                        <Button onClick={generatePwd}>
                            <FormattedMessage id="common.generate.pwd" />
                        </Button>
                    )}
                    {passwordMode === 'standby' && (
                        <Button onClick={resetPwd}>
                            <FormattedMessage id="common.reset.pwd" />
                        </Button>
                    )}
                    {passwordMode === 'edit' && (
                        <Button onClick={cancelResetPwd} type="link">
                            <FormattedMessage id="common.cancel.pwd" />
                        </Button>
                    )}
                </Row>
            </Form.Item>
            {showRepeat && (
                <Form.Item label={intl.formatMessage({ id: 'common.password.repeat' })}>
                    {getFieldDecorator(
                        'passwordRepeat',
                        validators.passwordRepeat
                    )(
                        <Input.Password
                            className="xb-form-input"
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password.repeat' })}
                        />
                    )}
                </Form.Item>
            )}
        </div>
    );
};

const PasswordConfirmer = injectIntl(Core);

export default PasswordConfirmer;
