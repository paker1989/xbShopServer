import React, { forwardRef } from 'react';
import cx from 'classnames';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import * as AuthActionCreator from '../../store/action/authAction';
import getValidators from './validators';

import './login.scss';

const { Item: FormItem } = Form;

const LoginOption = forwardRef(({ value, onChange }, ref) => {
    const accountCls = cx('login-option clickable', {
        'is-active': value === 'account',
    });

    const mobileCls = cx('login-option clickable', {
        'is-active': value === 'mobile',
    });
    return (
        <div className="login-options" ref={ref}>
            <div className={accountCls} onKeyDown={() => onChange('account')} role="button" tabIndex={0}>
                <FormattedMessage id="common.account" />
            </div>
            <div className={mobileCls} onKeyDown={() => onChange('mobile')} role="button" tabIndex={0}>
                <FormattedMessage id="common.mobile.login" />
            </div>
        </div>
    );
});

const Core = ({ form, intl }) => {
    const dispatch = useDispatch();

    const validators = getValidators({ intl, form });
    const { getFieldDecorator } = form;

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                dispatch(AuthActionCreator.login(values));
            }
        });
    };

    const LoginAction = (
        <FormItem>
            {getFieldDecorator(
                'rememberMe',
                validators.rememberMe
            )(
                <Checkbox>
                    <FormattedMessage id="common.rememberme" />
                </Checkbox>
            )}
            <NavLink className="float right" to="/dashboard/admin">
                <FormattedMessage id="common.forgetpwd" />
            </NavLink>
            <Button type="primary" htmlType="submit" className="login-submit-btn" size="large">
                <FormattedMessage id="common.action.login" />
            </Button>
        </FormItem>
    );
    return (
        <Form className="login-form" onSubmit={onSubmit}>
            <FormItem>{getFieldDecorator('loginOpt', validators.loginOpt)(<LoginOption />)}</FormItem>
            <FormItem>
                {getFieldDecorator(
                    'login',
                    validators.login
                )(
                    <Input
                        size="large"
                        placeholder={intl.formatMessage({ id: 'common.login' })}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator(
                    'password',
                    validators.password
                )(
                    <Input
                        size="large"
                        type="password"
                        placeholder={intl.formatMessage({ id: 'common.password' })}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                )}
            </FormItem>
            {LoginAction}
        </Form>
    );
};

const mapStateToProps = (state) => ({
    productName: state.product.addProductReducer.productName,
    shortDscp: state.product.addProductReducer.shortDscp,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addProduct_step_one',
        mapPropsToFields(props) {
            return {
                productName: Form.createFormField({ value: props.productName }),
                shortDscp: Form.createFormField({ value: props.shortDscp }),
                categories: Form.createFormField({ value: props.categories }),
                galleries: Form.createFormField({ value: props.galleries }),
                specs: Form.createFormField({ value: props.specs }),
            };
        },
    })(injectIntl(Core))
);

export default WrappedForm;
