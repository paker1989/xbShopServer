import React, { useState } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Switch, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

import AttributSearcher from '../../../Common/AttributSearcher/attributSearcher';

const TeamTable = ({ intl, loading }) => {
    const [searchStr, setSearchStr] = useState('');

    const handleChange = () => {};

    const handleDelete = () => {};

    const handleSearch = (e) => {
        setSearchStr(e.target.value);
    };

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idAdmin',
            key: 'idAdmin',
        },
        {
            title: intl.formatMessage({ id: 'common.email' }),
            dataIndex: 'email',
            key: 'email',
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
                        checked={text === 0}
                        onChange={(checked) => {
                            handleChange(record.idProduct, checked ? 'activate' : 'deactivate');
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
                return (
                    <div className="option-sep-container">
                        <Popconfirm
                            title={intl.formatMessage({ id: 'common.delete.confirm' })}
                            onConfirm={() => handleDelete(record.idAdmin)}
                        >
                            <span className="clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.delete' })}
                            </span>
                        </Popconfirm>
                        <NavLink to={`/dashboard/addAdmin/${record.idAdmin}`}>
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
                dataSource={[]}
                rowKey={(record) => record.idAdmin}
                loading={loading}
            />
        </div>
    );
};

export default injectIntl(TeamTable);
