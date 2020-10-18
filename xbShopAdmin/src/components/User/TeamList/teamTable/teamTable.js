import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Switch, Popconfirm, message } from 'antd';
import { NavLink } from 'react-router-dom';

import AttributSearcher from '../../../Common/AttributSearcher/attributSearcher';
import useAdmins from '../../../../utils/hooks/useUserAdmins';

import * as UserActionCreator from '../../../../store/action/userAction';
import * as UserActionTypes from '../../../../store/actionType/userActionType';

const TeamTable = ({ intl, loading }) => {
    const [searchStr, setSearchStr] = useState('');
    const dispatch = useDispatch();
    const backendStatus = useSelector((state) => state.user.addAdmin.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAdmin.backendMsg);

    const allAdmins = useAdmins();

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_FAILED) {
            message.error(backendMsg);
            dispatch(UserActionCreator.resetAddAdminBackendStatus());
        } else if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_SUCCESS) {
            message.success(intl.formatMessage({ id: 'user.team.deleteAdmin.success' }));
            dispatch(UserActionCreator.resetAddAdminBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    const handleChange = () => {};

    const handleDelete = (idAdmin) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, isDeleted: true }));
    };

    const handleSearch = (e) => {
        setSearchStr(e.target.value);
    };

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idUser',
            key: 'idUser',
            width: 70,
            // sortOrder: 'descend' //
        },
        {
            title: intl.formatMessage({ id: 'common.email' }),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: intl.formatMessage({ id: 'common.phone' }),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: intl.formatMessage({ id: 'common.role' }),
            dataIndex: 'pref.role.label',
            key: 'userrole',
            render: (text, record) => {
                return record.pref.role.reserved ? intl.formatMessage({ id: `user.addAdmin.${text}` }) : text;
            },
        },
        {
            title: intl.formatMessage({ id: 'user.addAdmin.defaultPage' }),
            dataIndex: 'pref.indexPage.code',
            key: 'indexPage',
            render: (text) => {
                return intl.formatMessage({ id: `menu.${text}` });
            },
        },
        {
            title: intl.formatMessage({ id: 'common.active' }),
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text, record) => {
                return (
                    <Switch
                        checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                        unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                        checked={record.isActive}
                        // onChange={(checked) => {
                        //     handleChange(record.idProduct, checked ? 'activate' : 'deactivate');
                        // }}
                    />
                );
            },
        },
        {
            title: intl.formatMessage({ id: 'common.operation' }),
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <div className="option-sep-container">
                        <Popconfirm
                            title={intl.formatMessage({ id: 'common.delete.confirm' })}
                            onConfirm={() => handleDelete(record.idUser)}
                        >
                            <span className="clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.delete' })}
                            </span>
                        </Popconfirm>
                        <NavLink to={`/dashboard/addAdmin/${record.idUser}`}>
                            <FormattedMessage id="common.edit" />
                        </NavLink>
                    </div>
                );
            },
        },
    ];

    const searchPairs = [
        { inputVal: searchStr, labelText: 'common.email', placeholder: 'common.email', onChange: handleSearch },
    ];

    return (
        <div className="team-list-table">
            <AttributSearcher searchPairs={searchPairs} />
            <Table
                size="large"
                columns={columns}
                dataSource={allAdmins}
                rowKey={(record) => record.idUser}
                loading={loading}
                scroll={{ x: 800 }}
            />
        </div>
    );
};

export default injectIntl(TeamTable);
