import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

const RoleTable = ({ intl, loading }) => {
    const handleDelete = () => {};

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idRole',
            key: 'idRole',
        },
        {
            title: intl.formatMessage({ id: 'common.role' }),
            dataIndex: 'role',
            key: 'role',
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
                            onConfirm={() => handleDelete(record.idRole)}
                        >
                            <span className="clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.delete' })}
                            </span>
                        </Popconfirm>
                        <NavLink to={`/dashboard/editRole/${record.idRole}`}>
                            <FormattedMessage id="common.edit" />
                        </NavLink>
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
                dataSource={[]}
                rowKey={(record) => record.idRole}
                loading={loading}
            />
        </div>
    );
};

export default injectIntl(RoleTable);
