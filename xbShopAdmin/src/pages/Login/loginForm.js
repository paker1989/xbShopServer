import React, { useState } from 'react';
import cx from 'classnames';
import { Row, Col, Form, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Item: FormItem } = Form;
// const { Title: TypoT, Text: TypoTxt } = Typography;

const LoginForm = () => {
    const [loginOption, setLoginOption] = useState('account');

    const accountCls = cx('login-option', {
        'is-active': loginOption === 'account',
    });

    const mobileCls = cx('login-option', {
        'is-active': loginOption === 'mobile',
    });

    return (
        <Form className="login-form">
            <div className="login-options">
                <div className={accountCls}>
                    <FormattedMessage id="common.account" />
                </div>
                <div className={mobileCls}>
                    <FormattedMessage id="common.mobile.login" />
                </div>
            </div>
        </Form>
    );
};

export default LoginForm;
