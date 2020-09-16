import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Row, Col, Switch } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import PasswordConfirmer from '../../Common/PasswordConfirmer/pwdConfirmer';

import addAdminMeta from '../../../static/data/componentMeta/user/addAdminMeta';
import getValidators from './validators';
import * as UserActionCreator from '../../../store/action/userAction';

const { adminGenerator: generatorMeta } = addAdminMeta;
const { Option } = Select;

const AdminForm = (props) => {
    const { form, intl, history, idAdmin } = props;
    const { getFieldDecorator } = form;
    const validators = getValidators({ intl, form });
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(idAdmin !== -1);

    const cancelEdition = () => {
        history.push('/dashboard/teamList');
    };

    useEffect(() => {
        // console.log('mount');
        return () => {
            dispatch(UserActionCreator.resetAddAdminStates());
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            console.log(values);
            if (!errors) {
                // /* eslint-disable */
                // const { shortDscp, specs, ...otherValidatedProps } = values;
                // /* eslint-disable */
                // const { status, errorMsg } = validators.specs.global(specs);
                // if (status !== _SPEC_STATUS_OK) {
                //     message.error(errorMsg);
                //     return;
                // }
                // disptch(
                //     ProductActionCreator.submitAddProductStep({
                //         shortDscp: getNoEmptyStr(shortDscp),
                //         specs,
                //         ...otherValidatedProps,
                //         currentStep: 1,
                //     })
                // );
            }
        });
    };

    return (
        <Form onSubmit={onSubmit} {...generatorMeta.formLayout}>
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
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.yourRole' })}>
                {getFieldDecorator(
                    'idRole',
                    validators.idRole
                )(
                    <Select
                        style={{ width: 250 }}
                        placeholder={intl.formatMessage({ id: 'user.addAdmin.placeholder.role' })}
                    >
                        <Option value={1}>超级管理员</Option>
                        <Option value={2}>物流管理员</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.defaultPage' })}>
                {getFieldDecorator(
                    'defaultPage',
                    validators.defaultPage
                )(
                    <Select
                        disabled
                        style={{ width: 250 }}
                        placeholder={intl.formatMessage({ id: 'user.addAdmin.placeholder.defaultPage' })}
                    >
                        <Option value={1}>超级管理员</Option>
                        <Option value={2}>物流管理员</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.isActive' })}>
                {getFieldDecorator(
                    'isActive',
                    validators.isActive
                )(
                    <Switch
                        checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                        unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                    />
                )}
            </Form.Item>
            <PasswordConfirmer isRepeat={editMode === false} showGenerate form={form} validators={validators} />
            <Row>
                <Col {...generatorMeta.formLayout.labelCol}></Col>
                <Col {...generatorMeta.formLayout.wrapperCol}>
                    <Button htmlType="button" style={{ marginRight: 10 }} onClick={cancelEdition}>
                        <FormattedMessage id="common.cancel" />
                    </Button>
                    <Button type="primary" htmlType="submit">
                        <FormattedMessage id="common.confirm.back" />
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    idAdmin: state.user.addAdmin.idAdmin,
    idRole: state.user.addAdmin.idRole,
    isActive: state.user.addAdmin.isActive,
    phoneNumber: state.user.addAdmin.phoneNumber,
    email: state.user.addAdmin.email,
    defaultPage: state.user.addAdmin.defaultPage,
    password: state.user.addAdmin.password,
    passwordRepeat: state.user.addAdmin.passwordRepeat,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: generatorMeta.formName,
        mapPropsToFields(props) {
            return {
                idAdmin: Form.createFormField({ value: props.idAdmin }),
                idRole: Form.createFormField({ value: props.idRole }),
                isActive: Form.createFormField({ value: props.isActive }),
                phoneNumber: Form.createFormField({ value: props.phoneNumber }),
                email: Form.createFormField({ value: props.email }),
                defaultPage: Form.createFormField({ value: props.defaultPage }),
                password: Form.createFormField({ value: props.password }),
                passwordRepeat: Form.createFormField({ value: props.passwordRepeat }),
            };
        },
    })(injectIntl(withRouter(AdminForm)))
);

export default WrappedForm;
