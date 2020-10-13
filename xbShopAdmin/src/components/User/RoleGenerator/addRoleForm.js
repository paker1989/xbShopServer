import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import React, { useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import addRoleMeta from '../../../static/data/componentMeta/user/addRoleMeta';
import * as UserActionCreator from '../../../store/action/userAction';
import * as UserActionTypes from '../../../store/actionType/userActionType';
import useUserAccesses from '../../../utils/hooks/useUserAccesses';
import useUserRoles from '../../../utils/hooks/useUserRoles';
import getValidators from './validators';

const { roleGenerator: generatorMeta } = addRoleMeta;

const RoleForm = (props) => {
    const { form, intl, history, match, roleName, accesses } = props;

    let idRole = match.params.idRole ? Number(match.params.idRole) : -1;

    const { getFieldDecorator } = form;
    const validators = getValidators({ intl, form });

    const dispatch = useDispatch();
    const backendStatus = useSelector((state) => state.user.addRole.backendStatus);
    const backendMsg = useSelector((state) => state.user.addRole.backendMsg);

    const allUserAccesses = useUserAccesses();
    const allUserRoles = useUserRoles();

    const cancelEdition = () => {
        history.push('/dashboard/teamList');
    };

    useEffect(() => {
        return () => {
            dispatch(UserActionCreator.resetAddRoleStates());
        };
    }, []);

    useEffect(() => {
        if (allUserRoles.length > 0 && idRole !== -1) {
            // check if idRole is fake
            const valideRole = allUserRoles.find((role) => role.idRole === idRole);
            if (!valideRole) {
                message.warn(intl.formatMessage({ id: 'user.addRole.error.invalidRoleId' }));
                idRole = -1;
            } else if (!roleName || accesses.length === 0) {
                // 可能是刷新了页面但是idRole != 0
                dispatch(
                    UserActionCreator.editUserRole({
                        roleName: valideRole.label,
                        accesses: valideRole.accesses.map((item) => item.idUserAccess),
                    })
                );
            }
        }
    }, [allUserRoles.length]);

    useEffect(() => {
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === UserActionTypes._USER_ROLE_UPDATE_SUCCESS) {
            history.push('/dashboard/teamList');
        } else if (backendStatus === UserActionTypes._USER_ROLE_UPDATE_FAILED) {
            message.error(backendMsg);
        }
        dispatch(UserActionCreator.resetAddRoleBackendStatus());
    }, [backendStatus, backendMsg]);

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                // check duplicate
                const duplicatedUserRole = allUserRoles.find(
                    (role) => role.label === values.roleName && role.idRole !== idRole
                );
                if (duplicatedUserRole) {
                    form.setFields({
                        roleName: {
                            value: values.roleName,
                            errors: [new Error(intl.formatMessage({ id: 'user.addRole.error.dupliName' }))],
                        },
                    });
                    return;
                }
                if (idRole === -1) {
                    dispatch(UserActionCreator.submitRoleEdition({ idRole, ...values }));
                } else {
                    const touchedValues = validators.getTouchedFields(values);
                    if (touchedValues.length === 0) {
                        cancelEdition();
                    } else {
                        // only update impacted fields
                        dispatch(UserActionCreator.submitRoleEdition({ idRole, ...touchedValues }));
                    }
                }
            }
        });
    };

    return (
        <Form onSubmit={onSubmit} {...generatorMeta.formLayout}>
            <Form.Item label={intl.formatMessage({ id: 'user.addRole.name.mandatory' })}>
                {getFieldDecorator(
                    'roleName',
                    validators.roleName
                )(<Input style={{ width: 250 }} placeholder={intl.formatMessage({ id: 'user.addRole.name' })} />)}
            </Form.Item>
            <Form.Item
                label={intl.formatMessage({ id: 'user.addRole.access' })}
                extra={intl.formatMessage({ id: 'user.addRole.access.tooltip' })}
            >
                {getFieldDecorator(
                    'accesses',
                    validators.accesses
                )(
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {allUserAccesses.map((access) => (
                                <Col
                                    span={8}
                                    style={{ marginBottom: 10 }}
                                    className="useraccess-item"
                                    key={`access-${access.idUserAccess}`}
                                >
                                    <Checkbox value={access.idUserAccess}>
                                        {intl.formatMessage({ id: `menu.${access.code}` })}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                )}
            </Form.Item>
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
    idRole: state.user.addRole.idRole,
    roleName: state.user.addRole.roleName,
    accesses: state.user.addRole.accesses,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: generatorMeta.formName,
        mapPropsToFields(props) {
            return {
                idRole: Form.createFormField({ value: props.idRole }),
                roleName: Form.createFormField({ value: props.roleName }),
                accesses: Form.createFormField({ value: props.accesses }),
            };
        },
    })(injectIntl(withRouter(RoleForm)))
);

export default WrappedForm;
