import React, { useEffect } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as UserActionCreator from '../../../../store/action/userAction';
import * as UserActionTypes from '../../../../store/actionType/userActionType';

import useUserRoles from '../../../../utils/hooks/useUserRoles';

const RoleTable = ({ intl, loading, history }) => {
    const dispatch = useDispatch();
    const backendStatus = useSelector((state) => state.user.addRole.backendStatus);
    const backendMsg = useSelector((state) => state.user.addRole.backendMsg);

    const handleDelete = (idRole) => {
        dispatch(UserActionCreator.attemptDeleteUserrole({ idRole }));
    };

    const userRoles = useUserRoles();

    /**
     * edit role
     * @param {*} userRole
     */
    const editRole = (userRole) => {
        history.push(`/dashboard/addRole/${userRole.idRole}`);
    };

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ADMIN_DELETE_USERROLE_FAILD) {
            message.error(intl.formatMessage({ id: backendMsg }) || backendMsg);
            dispatch(UserActionCreator.resetAddRoleBackendStatus());
        } else if (backendStatus === UserActionTypes._USER_ADMIN_DELETE_USERROLE_SUCCEED) {
            message.success(intl.formatMessage({ id: 'user.team.deleteRole.success' }));
            dispatch(UserActionCreator.resetAddRoleBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idRole',
            key: 'idRole',
        },
        {
            title: intl.formatMessage({ id: 'common.role' }),
            dataIndex: 'label',
            key: 'label',
            render: (text, record) => {
                return record.reserved ? <FormattedMessage id={`user.addAdmin.${text}`} /> : text;
            },
        },
        {
            title: intl.formatMessage({ id: 'common.operation' }),
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <div className="option-sep-container">
                        {!record.reserved && (
                            <Popconfirm
                                title={intl.formatMessage({ id: 'common.delete.confirm' })}
                                onConfirm={() => handleDelete(record.idRole)}
                            >
                                <span className="clickable danger inline-block">
                                    {intl.formatMessage({ id: 'common.delete' })}
                                </span>
                            </Popconfirm>
                        )}
                        {/* <NavLink to={`/dashboard/addRole/${record.idRole}`}> */}
                        {/* eslint-disable */}
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                editRole(record);
                            }}
                        >
                            <FormattedMessage id="common.edit" />
                        </a>
                        {/* eslint-enable */}
                        {/* </NavLink> */}
                    </div>
                );
            },
        },
    ];

    return (
        <div className="team-list-table">
            <Table
                size="large"
                columns={columns}
                dataSource={userRoles}
                rowKey={(record) => record.idRole}
                loading={loading}
                rowClassName={(record) => (record.new ? 'new' : null)}
            />
        </div>
    );
};

export default injectIntl(withRouter(RoleTable));
