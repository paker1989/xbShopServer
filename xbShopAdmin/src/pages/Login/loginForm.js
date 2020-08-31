import React, { forwardRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import * as AuthActionType from '../../store/actionType/authActionType';
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

const Core = ({ form, intl, history }) => {
    const dispatch = useDispatch();

    const validators = getValidators({ intl, form });

    const { getFieldDecorator } = form;

    const backendMsg = useSelector((state) => state.auth.backendMsg);
    const backendStatus = useSelector((state) => state.auth.backendStatus);

    const [localErrorMsg, setLocalErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (backendStatus === AuthActionType._AUTH_LOGIN_SUCCESS) {
            dispatch(AuthActionCreator.resetBackendStatus());
            history.push('/dashboard');
        } else if (backendStatus === AuthActionType._AUTH_LOGIN_FAIL) {
            dispatch(AuthActionCreator.resetBackendStatus());
            setLocalErrorMsg(backendMsg);
            setLoading(false);
        }
    }, [backendStatus]);

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                setLoading(true);
                setLocalErrorMsg('');
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
            <Button type="primary" htmlType="submit" className="login-submit-btn" size="large" loading={loading}>
                <FormattedMessage id="common.action.login" />
            </Button>
        </FormItem>
    );
    return (
        <Form className="login-form" onSubmit={onSubmit}>
            <FormItem>{getFieldDecorator('loginOpt', validators.loginOpt)(<LoginOption />)}</FormItem>
            <FormItem>
                {getFieldDecorator(
                    'username',
                    validators.username
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
            <div>{localErrorMsg}</div>
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
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
