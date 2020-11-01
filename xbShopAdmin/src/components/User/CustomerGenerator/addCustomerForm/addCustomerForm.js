import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import { injectIntl } from 'react-intl';
import { useUnmount } from 'ahooks';
import { NavLink, withRouter } from 'react-router-dom';

import { customerGenerator as addCustomerMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/userActionType';
import * as CustomerActionCreator from '../../../../store/action/userAction';

import getValidators from './validators';

const { formLayout } = addCustomerMeta;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl, history, match } = props;

    const { getFieldDecorator } = form;
    const validators = getValidators({ intl, form });

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                // dispatch(CategoryActionCreator.updateCategory({ ...values }));
            }
        });
    };

    return (
        <Form onSubmit={onSubmit} {...formLayout}>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.email.mandatory' })}>
                {getFieldDecorator(
                    'email',
                    validators.email
                )(<Input style={{ width: 250 }} placeholder={intl.formatMessage({ id: 'user.addAdmin.email' })} />)}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'common.phone' })}>
                {getFieldDecorator(
                    'phoneNumber',
                    validators.phoneNumber
                )(<Input style={{ width: 250 }} placeholder={intl.formatMessage({ id: 'common.phone' })} />)}
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    // categoryName: state.categoryReducer.editionFields.label,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addCustomerForm',
        mapPropsToFields(props) {
            return {
                // categoryName: Form.createFormField({ value: props.categoryName }),
            };
        },
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
