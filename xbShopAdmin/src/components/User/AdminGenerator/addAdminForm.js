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
import useUserRoles from '../../../utils/hooks/useUserRoles';

const { adminGenerator: generatorMeta } = addAdminMeta;
const { Option } = Select;

const AdminForm = (props) => {
    const { form, intl, history, idAdmin, idRole } = props;
    const { getFieldDecorator } = form;
    const validators = getValidators({ intl, form });

    const dispatch = useDispatch();
    const backendStatus = useSelector((state) => state.user.addAdmin.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAdmin.backendMsg);

    const userRoles = useUserRoles();

    // const userRoles = [{ idRole: 1, label: 'superAdmin', accesses: [{ code: 'teamList', idUserAccess: 1 }] }];

    const populateUserAccesses = () => {
        const matchedRole = userRoles.find((role) => role.idRole === idRole);
        return matchedRole ? matchedRole.accesses : [];
    };

    const [userAccesses, setUserAccesses] = useState(populateUserAccesses());

    const [editMode /* setEditMode */] = useState(idAdmin !== -1);

    const cancelEdition = () => {
        history.push('/dashboard/teamList');
    };

    useEffect(() => {
        return () => {
            dispatch(UserActionCreator.resetAddAdminStates());
        };
    }, []);

    useEffect(() => {
        setUserAccesses(populateUserAccesses());
    }, [userRoles.length]);

    useEffect(() => {
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_SUCCESS) {
            history.push('/dashboard/teamList');
        } else if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_FAILED) {
            message.error(backendMsg);
        }
        dispatch(UserActionCreator.resetAddAdminBackendStatus());
    }, [backendStatus, backendMsg]);

    const onSelectRole = (val) => {
        const selectedUserRole = userRoles.find((item) => item.idRole === val);
        if (selectedUserRole != null) {
            setUserAccesses(selectedUserRole.accesses);
        }
    };

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
                                {intl.formatMessage({ id: `user.addAdmin.${role.label}` })}
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
