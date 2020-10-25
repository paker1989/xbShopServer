import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, Row, Col, Switch, message } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import PasswordConfirmer from '../../Common/PasswordConfirmer/pwdConfirmer';

import addAdminMeta from '../../../static/data/componentMeta/user/addAdminMeta';
import getValidators from './validators';

import * as UserActionCreator from '../../../store/action/userAction';
import * as UserActionTypes from '../../../store/actionType/userActionType';
import * as ServerErrorType from '../../../static/data/serverErrorType/authType';
import useUserRoles from '../../../utils/hooks/useUserRoles';
import useUserAdmins from '../../../utils/hooks/useUserAdmins';

const { adminGenerator: generatorMeta } = addAdminMeta;
const { Option } = Select;

const AdminForm = (props) => {
    const { form, intl, history, match, idRole } = props;
    // console.log(props);
    const { getFieldDecorator, setFieldsValue } = form;
    const validators = getValidators({ intl, form });
    let idAdmin = match.params.idAdmin ? parseInt(match.params.idAdmin, 10) : -1;
    const allAdmins = useUserAdmins(false);

    const dispatch = useDispatch();
    const backendStatus = useSelector((state) => state.user.addAdmin.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAdmin.backendMsg);

    const userRoles = useUserRoles();

    const populateUserAccesses = () => {
        const matchedRole = userRoles.find((role) => role.idRole === idRole);
        return matchedRole ? matchedRole.accesses : [];
    };

    const [userAccesses, setUserAccesses] = useState(populateUserAccesses());

    const cancelEdition = () => {
        history.push('/dashboard/teamList');
    };

    // reset fields before unmount
    useEffect(() => {
        if (idAdmin !== -1 && allAdmins.length > 0) {
            const toUpdate = allAdmins.find((admin) => admin.idUser === idAdmin);
            if (toUpdate) {
                const { email, isActive, pref, phoneNumber } = toUpdate;
                dispatch(
                    UserActionCreator.setUpdateAdminStates({
                        email,
                        isActive,
                        phoneNumber,
                        defaultPage: pref.indexPage.idUserAccess,
                        idRole: pref.role.idRole,
                    })
                );
            } else {
                idAdmin = -1;
                dispatch(UserActionCreator.resetAddAdminStates());
            }
        }
        return () => {
            dispatch(UserActionCreator.resetAddAdminStates());
        };
    }, [allAdmins.length]);

    // populate user access upon user roles population or idRole changed
    useEffect(() => {
        setUserAccesses(populateUserAccesses());
    }, [userRoles.length, idRole]);

    // handle save status
    useEffect(() => {
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_SUCCESS) {
            history.push('/dashboard/teamList');
        } else if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_FAILED) {
            if (
                backendMsg === ServerErrorType._AUTH_ADMIN_EMAIL_DUPLICATED ||
                backendMsg === ServerErrorType._AUTH_ADMIN_EMAIL_NOT_PRESENT
            ) {
                form.setFields({
                    email: {
                        value: form.getFieldValue('email'),
                        errors: [new Error(intl.formatMessage({ id: 'user.addAdmin.error.email.duplica' }))],
                    },
                });
            } else {
                message.error(backendMsg);
            }
        }
        dispatch(UserActionCreator.resetAddAdminBackendStatus());
    }, [backendStatus, backendMsg]);

    // upon select different role
    const onSelectRole = (val) => {
        const selectedUserRole = userRoles.find((item) => item.idRole === val);
        if (selectedUserRole != null) {
            setUserAccesses(selectedUserRole.accesses);
            setFieldsValue({ defaultPage: selectedUserRole.accesses[0].idUserAccess });
        }
    };

    // submit
    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            // console.log(values);
            if (!errors) {
                /* eslint-disable */
                delete values.passwordRepeat;
                /* eslint-enable */
                dispatch(UserActionCreator.submitAdminEdition({ idAdmin, ...values }));
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
                        onChange={onSelectRole}
                        style={{ width: 250 }}
                        placeholder={intl.formatMessage({ id: 'user.addAdmin.placeholder.role' })}
                    >
                        {userRoles.map((role) => (
                            <Option value={role.idRole} key={`role-${role.idRole}`}>
                                {role.reserved ? <FormattedMessage id={`user.addAdmin.${role.label}`} /> : role.label}
                            </Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.defaultPage' })}>
                {getFieldDecorator(
                    'defaultPage',
                    validators.defaultPage
                )(
                    <Select
                        disabled={userAccesses.length === 0}
                        style={{ width: 250 }}
                        placeholder={intl.formatMessage({ id: 'user.addAdmin.placeholder.defaultPage' })}
                    >
                        {userAccesses.map((access) => (
                            <Option value={access.idUserAccess} key={`role-${access.idUserAccess}`}>
                                {intl.formatMessage({ id: `menu.${access.code}` })}
                            </Option>
                        ))}
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
            <PasswordConfirmer isRepeat={idAdmin === -1} showGenerate form={form} validators={validators} />
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
