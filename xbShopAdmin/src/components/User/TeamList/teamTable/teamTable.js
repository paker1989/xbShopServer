import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Switch, Popconfirm, message, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';

import AttributSearcher from '../../../Common/AttributSearcher/attributSearcher';
import useAdmins from '../../../../utils/hooks/useUserAdmins';

import * as UserActionCreator from '../../../../store/action/userAction';
import * as UserActionTypes from '../../../../store/actionType/userActionType';

const { TabPane } = Tabs;

const TeamTable = ({ intl, loading }) => {
    const [searchStr, setSearchStr] = useState('');
    const dispatch = useDispatch();

    const backendStatus = useSelector((state) => state.user.addAdmin.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAdmin.backendMsg);
    const activeTab = useSelector((state) => state.user.admins.teamSubTab);

    const allAdmins = useAdmins(activeTab === 'deleted');

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_FAILED) {
            message.error(backendMsg);
            dispatch(UserActionCreator.resetAddAdminBackendStatus());
        } else if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_SUCCESS) {
            message.success(
                intl.formatMessage({
                    id: backendMsg === 'restore' ? 'user.team.restoreAdmin.success' : 'user.team.deleteAdmin.success',
                })
            );
            dispatch(UserActionCreator.resetAddAdminBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    const handleChange = () => {};

    const handleRestore = (idAdmin) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, restore: true }));
    };

    const handleDelete = (idAdmin) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, isDeleted: true }));
    };

    const switchTab = (tab) => {
        dispatch(UserActionCreator.switchTeamSubTab(tab));
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
                        disabled={record.isDeleted}
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
                return record.isDeleted ? (
                    <div className="option-sep-container">
                        <Popconfirm
                            title={intl.formatMessage({ id: 'common.restore.confirm' })}
                            onConfirm={() => handleRestore(record.idUser)}
                        >
                            <span className="clickable linkable inline-block">
                                {intl.formatMessage({ id: 'common.restore' })}
                            </span>
                        </Popconfirm>

                        <Popconfirm
                            title={intl.formatMessage({ id: 'common.destroy.confirm' })}
                            onConfirm={() => handleDelete(record.idUser)}
                        >
                            <span className="clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.destroy' })}
                            </span>
                        </Popconfirm>
                    </div>
                ) : (
                    <div className="option-sep-container">
                        <NavLink to={`/dashboard/addAdmin/${record.idUser}`}>
                            <FormattedMessage id="common.edit" />
                        </NavLink>
                        <Popconfirm
                            title={intl.formatMessage({ id: 'common.delete.confirm' })}
                            onConfirm={() => handleDelete(record.idUser)}
                        >
                            <span className="clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.delete' })}
                            </span>
                        </Popconfirm>
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
            <Tabs activeKey={activeTab} onTabClick={(tab) => switchTab(tab)}>
                <TabPane tab={intl.formatMessage({ id: 'user.team.allAdmins' })} key="all"></TabPane>
                <TabPane tab={intl.formatMessage({ id: 'common.deleted' })} key="deleted"></TabPane>
            </Tabs>
            <Table
                size="large"
                columns={columns.filter((item) => !item.hidden)}
                dataSource={allAdmins}
                rowKey={(record) => record.idUser}
                loading={loading}
                scroll={{ x: 800 }}
                rowClassName={(record) => (record.new ? 'new' : null)}
            />
        </div>
    );
};

export default injectIntl(TeamTable);
