import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

import { getFilterStrings } from '../../../utils/data.helper';
import AttributSearcher from '../../Common/AttributSearcher/attributSearcher';
import useCustomers from '../../../utils/hooks/useUserCustomers';
import { pageSize, filterTypes } from '../../../static/data/componentMeta/user/customerListMeta';

import * as CustomerActionCreator from '../../../store/action/customerAction';

const CustomerTable = ({ intl }) => {
    const dispatch = useDispatch();

    // const [searchStr, setSearchStr] = useState('');
    const [bindSearch, setBindSearch] = useState('');
    const currentPage = useSelector((state) => state.user.customers.currentPage);
    const totalCnt = useSelector((state) => state.user.customers.totalCnt);

    const [loading, customers] = useCustomers();

    // console.log(customers);
    const handleDelete = (idCustomer) => {
        // dispatch(UserActionCreator.submitAdminEdition({ idAdmin, action: 'delete' }));
    };

    const handleSearch = (e) => {
        setBindSearch(e.target.value.trim());
    };

    const actionSearch = () => {
        // setSearchStr(bindSearch);
        dispatch(CustomerActionCreator.changeListParams({ searchStr: bindSearch }));
    };

    const handleTableChange = (pagination, filters, sorter) => {
        /* eslint-disable */
        // console.log(pagination);
        console.log(filters);
        // console.log(sorter);
        const { current: currentPage } = pagination;
        let { order: sortedOrder = 'NA', columnKey: sortedCretia = 'NA' } = sorter;

        if (sortedOrder === 'NA') {
            sortedCretia = 'NA';
        }
        switch (sortedOrder) {
            case 'NA':
                sortedCretia = 'NA';
                break;
            case 'ascend':
                sortedOrder = 'asc';
                break;
            case 'descend':
                sortedOrder = 'desc';
                break;
            default:
                break;
        }

        const filter = getFilterStrings(filterTypes, filters);

        console.log(filter);

        dispatch(CustomerActionCreator.changeListParams({ sortedCretia, sortedOrder, currentPage, filter }));
        /* eslint-enable */
    };

    useEffect(() => {
        actionSearch();
    }, [customers.length]);

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idCustomer',
            key: 'idCustomer',
            width: 70,
            sorter: true,
        },
        {
            title: intl.formatMessage({ id: 'common.thumbnail' }),
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text, record) => {
                return <img className="thumbnail" src={text} alt={record.pseudo} />;
            },
            width: 80,
        },
        {
            title: intl.formatMessage({ id: 'common.pseudo' }),
            dataIndex: 'pseudo',
            key: 'pseudo',
            width: 120,
        },
        {
            title: intl.formatMessage({ id: 'common.email' }),
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        // {
        //     title: intl.formatMessage({ id: 'common.phone' }),
        //     dataIndex: 'phone',
        //     key: 'phone',
        //     width: 160,
        // },
        {
            title: intl.formatMessage({ id: 'common.gender' }),
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: intl.formatMessage({ id: 'common.gender.m' }), value: 'm' },
                { text: intl.formatMessage({ id: 'common.gender.f' }), value: 'f' },
            ],
            // sorter: true,
            width: 90,
            render: (text) => {
                return <FormattedMessage id={`common.gender.${text}`} />;
            },
        },
        {
            title: intl.formatMessage({ id: 'common.status' }),
            dataIndex: 'isActive',
            key: 'isActive',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            render: (text, record) => {
                return record.isActive ? 'Active' : 'Inactived';
            },
            width: 100,
        },
        {
            title: intl.formatMessage({ id: 'common.registDt' }),
            dataIndex: 'registerDtStr',
            key: 'registerDt',
            width: 230,
            sorter: true,
        },
        // {
        //     title: intl.formatMessage({ id: 'common.recentAccess' }),
        //     dataIndex: 'lastAccessDt',
        //     key: 'lastAccessDt',
        // },
        {
            title: intl.formatMessage({ id: 'common.operation' }),
            dataIndex: 'operation',
            key: 'operation',
            width: 220,
            render: (text, record) => (
                <div className="option-sep-container">
                    <NavLink to={`/dashboard/addCustomer?customerId=${record.idCustomer}`}>
                        <FormattedMessage id="common.edit" />
                    </NavLink>
                    <Popconfirm
                        title={intl.formatMessage({ id: 'common.delete.confirm' })}
                        onConfirm={() => handleDelete(record.idCustomer)}
                    >
                        <span className="clickable danger inline-block">
                            {intl.formatMessage({ id: 'common.delete' })}
                        </span>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const searchPairs = [
        {
            inputVal: bindSearch,
            labelText: 'common.email.or.pseudo',
            placeholder: 'common.email.or.pseudo',
            onChange: handleSearch,
        },
    ];

    return (
        <div className="customer-list-table">
            <AttributSearcher searchPairs={searchPairs} onSubmit={actionSearch} />
            <Table
                size="large"
                columns={columns.filter((item) => !item.hidden)}
                // dataSource={
                //     searchStr && searchStr.length > 0
                //         ? customers.filter((customer) => customer.email.includes(searchStr))
                //         : customers
                // }
                dataSource={customers}
                onChange={handleTableChange}
                pagination={{
                    total: totalCnt,
                    pageSize,
                    current: currentPage,
                }}
                rowKey={(record) => record.idCustomer}
                loading={loading}
                scroll={{ x: 800 }}
                rowClassName={(record) => (record.new ? 'new' : null)}
            />
        </div>
    );
};

export default injectIntl(CustomerTable);
