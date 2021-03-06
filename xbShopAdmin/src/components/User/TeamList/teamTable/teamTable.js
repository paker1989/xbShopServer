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
    const [bindSearch, setBindSearch] = useState('');

    const dispatch = useDispatch();

    const backendStatus = useSelector((state) => state.user.addAdmin.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAdmin.backendMsg);
    const activeTab = useSelector((state) => state.user.admins.teamSubTab);

    const allAdmins = useAdmins(activeTab === 'deleted');

    const handleRestore = (idAdmin, email) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, email, action: 'restore' }));
    };

    const handleDelete = (idAdmin) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, action: 'delete' }));
    };

    const handleDestroy = (idAdmin) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, action: 'destroy' }));
    };

    const switchTab = (tab) => {
        dispatch(UserActionCreator.switchTeamSubTab(tab));
    };

    const handleSearch = (e) => {
        setBindSearch(e.target.value.trim());
    };

    const actionSearch = () => {
        setSearchStr(bindSearch);
    };

    const handleChange = (idAdmin, isActive) => {
        dispatch(UserActionCreator.submitAdminEdition({ idAdmin, isActive, action: 'update' }));
    };

    useEffect(() => {
        actionSearch();
    }, [allAdmins.length]);

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_FAILED) {
            message.error(backendMsg);
            dispatch(UserActionCreator.resetAddAdminBackendStatus());
        } else if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_SUCCESS) {
            message.success(
                intl.formatMessage({
                    id: `user.team.${backendMsg}Admin.success`, // restore or delete or destroy
                })
            );
            dispatch(UserActionCreator.resetAddAdminBackendStatus());
        }
    }, [backendStatus, backendMsg]);

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
                        disabled={record.isDeleted || record.self}
                        checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                        unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                        checked={record.isActive}
                        onChange={(checked) => {
                            handleChange(record.idUser, checked);
                        }}
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
                            onConfirm={() => handleRestore(record.idUser, record.email)}
                        >
                            <span className="clickable linkable inline-block">
                                {intl.formatMessage({ id: 'common.restore' })}
                            </span>
                        </Popconfirm>
                        {!record.self && (
                            <Popconfirm
                                title={intl.formatMessage({ id: 'common.destroy.confirm' })}
                                onConfirm={() => handleDestroy(record.idUser)}
                            >
                                <span className="clickable danger inline-block">
                                    {intl.formatMessage({ id: 'common.destroy' })}
                                </span>
                            </Popconfirm>
                        )}
                    </div>
                ) : (
                    <div className="option-sep-container">
                        <NavLink to={`/dashboard/addAdmin/${record.idUser}`}>
                            <FormattedMessage id="common.edit" />
                        </NavLink>
                        {!record.self && (
                            <Popconfirm
                                title={intl.formatMessage({ id: 'common.delete.confirm' })}
                                onConfirm={() => handleDelete(record.idUser)}
                            >
                                <span className="clickable danger inline-block">
                                    {intl.formatMessage({ id: 'common.delete' })}
                                </span>
                            </Popconfirm>
                        )}
                    </div>
                );
            },
        },
    ];

    const searchPairs = [
        {
            inputVal: bindSearch,
            labelText: 'common.email',
            placeholder: 'common.email',
            onChange: handleSearch,
        },
    ];

    return (
        <div className="team-list-table">
            <AttributSearcher searchPairs={searchPairs} onSubmit={actionSearch} />
            <Tabs activeKey={activeTab} onTabClick={(tab) => switchTab(tab)}>
                <TabPane tab={intl.formatMessage({ id: 'user.team.allAdmins' })} key="all"></TabPane>
                <TabPane tab={intl.formatMessage({ id: 'common.deleted' })} key="deleted"></TabPane>
            </Tabs>
            <Table
                size="large"
                columns={columns.filter((item) => !item.hidden)}
                dataSource={
                    searchStr && searchStr.length > 0
                        ? allAdmins.filter((admin) => admin.email.includes(searchStr))
                        : allAdmins
                }
                rowKey={(record) => record.idUser}
                loading={loading}
                scroll={{ x: 800 }}
                rowClassName={(record) => (record.new ? 'new' : null)}
            />
        </div>
    );
};

export default injectIntl(TeamTable);
