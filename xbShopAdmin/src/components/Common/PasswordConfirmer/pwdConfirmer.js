import React, { useEffect, useRef } from 'react';
import { Row, Input, Button, Form } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';


/**
 * @param {*} showGenerate: 是否提供密码生成
 * @param {*} isRepeat: 是否重复确认密码
 */
const Core = ({
    intl,
    form,
    validators,
    mode = 'input', // create, edit, standby, input
    showGenerate = false,
    generatePwd,
    resetPwd,
}) => {
    const { getFieldDecorator } = form;

    const prevModeRef = useRef();

    const showRepeat = mode === 'edit' || mode === 'create';

    useEffect(() => {
        prevModeRef.current = mode;
    });

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
                            disabled={mode === 'standby'}
                            style={{ width: 250 }}
                            type="password"
                            placeholder={intl.formatMessage({ id: 'common.password' })}
                        />
                    )}
                    {showGenerate && showRepeat && (
                        <Button style={{ marginLeft: 10 }} onClick={generatePwd}>
                            <FormattedMessage id="common.generate.pwd" />
                        </Button>
                    )}
                    {mode === 'standby' && (
                        <Button style={{ marginLeft: 10 }} onClick={resetPwd}>
                            <FormattedMessage id="common.reset.pwd" />
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

const PasswordConfirmer = injectIntl(Core);

export default PasswordConfirmer;
