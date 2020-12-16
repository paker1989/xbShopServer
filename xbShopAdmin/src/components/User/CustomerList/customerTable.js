import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

import { getFilterStrings } from '../../../utils/data.helper';
import AttributSearcher from '../../Common/AttributSearcher/attributSearcher';
import useCustomers from '../../../utils/hooks/useUserCustomers';
import { pageSize, filterTypes } from '../../../static/data/componentMeta/user/customerListMeta';
import { pagniation } from '../../../static/data/componentMeta/global.meta';

import * as CustomerActionCreator from '../../../store/action/customerAction';
import TableFilter from '../../Common/TableFilter/tableFilter';

const { showQuickJumper } = pagniation;

const CustomerTable = ({ intl }) => {
    const dispatch = useDispatch();

    const [tableFilterProps, setTableFilterProps] = useState([]);
    const [bindSearch, setBindSearch] = useState('');
    const currentPage = useSelector((state) => state.user.customers.currentPage);
    const totalCnt = useSelector((state) => state.user.customers.totalCnt);
    const searchStr = useSelector((state) => state.user.customers.searchStr);

    const filterInfo = useSelector((state) => state.user.customers.filter);
    const filterStr = getFilterStrings(filterTypes, filterInfo);
    // console.log('filterStr = ' + filterStr);

    const [loading, customers] = useCustomers(intl);

    // console.log(customers);
    const handleDelete = (idCustomer) => {
        dispatch(CustomerActionCreator.saveCustomer({ idCustomer, action: 'delete' }));
    };

    const handleSearch = (e) => {
        setBindSearch(e.target.value.trim());
    };

    const actionSearch = () => {
        if (bindSearch !== searchStr) {
            dispatch(CustomerActionCreator.changeListParams({ searchStr: bindSearch }));
        }
    };

    const handleCancelFilter = ({ type, value }) => {
        if (typeof filterInfo[type] !== 'undefined') {
            const index = filterInfo[type].findIndex((item) => item === value);
            if (index >= 0) {
                filterInfo[type].splice(index, 1);
                dispatch(CustomerActionCreator.changeListParams({ filter: { ...filterInfo } }));
            }
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        // debugger;
        /* eslint-disable */
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

        dispatch(CustomerActionCreator.changeListParams({ sortedCretia, sortedOrder, currentPage, filter: filters }));
        /* eslint-enable */
    };

    useEffect(() => {
        actionSearch();
    }, [customers.length]);

    useEffect(() => {
        // console.log('reset filterprops');
        const _filterProps = [];
        Object.keys(filterInfo).forEach((filterType) => {
            filterInfo[filterType].forEach((item) => {
                _filterProps.push({
                    type: filterType,
                    label:
                        /* eslint-disable */
                        filterType === 'gender'
                            ? intl.formatMessage({ id: `common.gender.${item}` })
                            : item
                            ? 'Active'
                            : 'Inactive',
                    /* eslint-enable */
                    value: item,
                });
            });
        });
        setTableFilterProps([..._filterProps]);
    }, [filterStr]);

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
        {
            title: intl.formatMessage({ id: 'common.gender' }),
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: intl.formatMessage({ id: 'common.gender.m' }), value: 'm' },
                { text: intl.formatMessage({ id: 'common.gender.f' }), value: 'f' },
            ],
            filteredValue: filterInfo.gender || [],
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
            filteredValue: filterInfo.isActive || [],
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
            <TableFilter filters={tableFilterProps} onChange={handleCancelFilter} />
            <Table
                size="large"
                columns={columns.filter((item) => !item.hidden)}
                dataSource={customers}
                onChange={handleTableChange}
                pagination={{
                    total: totalCnt,
                    pageSize,
                    current: currentPage,
                    showQuickJumper: totalCnt / pageSize > showQuickJumper,
                    showTotal: (total, range) =>
                        intl.formatMessage({ id: 'customer.showTotal' }, { r1: range[0], r2: range[1], total }),
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
