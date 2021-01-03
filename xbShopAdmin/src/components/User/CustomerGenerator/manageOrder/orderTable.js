import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Table, Button } from 'antd';

// import TableFilter from '../../../Common/TableFilter/tableFilter';
import AttributSearcher from '../../../Common/AttributSearcher/attributSearcher';

import { getPriceFormatter } from '../../../../utils/data.helper';
import { getOrderStatus, getCurrencySymbol } from '../../../../utils/component/order.helper';

const OrderTable = ({ intl }) => {
    const handleTableChange = useCallback(() => {}, []);

    const customers = [
        {
            id: 1201,
            orderRef: 'SK0010002112',
            number: 12,
            price: '122.30',
            createAt: '2020-11-08 17:11:11',
            status: 1,
            currency: 'yuan',
        },
        {
            id: 1202,
            orderRef: 'SK0010021122',
            number: 3,
            price: '123',
            createAt: '2020-12-08 17:11:11',
            status: 3,
            currency: 'yuan',
        },
        {
            id: 12014,
            orderRef: 'SK00100032112',
            number: 12,
            price: '200.3',
            createAt: '2020-11-08 17:11:11',
            status: 2,
            currency: 'euro',
        },
    ];

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'id',
            key: 'orderId',
            width: 70,
            sorter: true,
        },
        {
            title: intl.formatMessage({ id: 'order.common.ref' }),
            dataIndex: 'orderRef',
            key: 'orderRef',
            width: 140,
        },
        {
            title: intl.formatMessage({ id: 'order.common.nbProduct' }),
            dataIndex: 'number',
            key: 'number',
            width: 100,
        },
        {
            title: intl.formatMessage({ id: 'product.spec.price' }),
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                return (
                    <span className="price">{`${getCurrencySymbol(record.currency)}${getPriceFormatter(text)}`}</span>
                );
            },
            width: 80,
        },
        {
            title: intl.formatMessage({ id: 'order.common.orderDate' }),
            dataIndex: 'createAt',
            key: 'createAt',
            width: 180,
            sorter: true,
        },
        {
            title: intl.formatMessage({ id: 'common.status' }),
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (text) => {
                const status = getOrderStatus(text) || { val: 'other' };
                return (
                    <span style={{ color: status.color }}>
                        <FormattedMessage id={`order.status.${status.val}`} />
                    </span>
                );
            },
        },
        {
            title: intl.formatMessage({ id: 'common.operation' }),
            dataIndex: 'operation',
            key: 'operation',
            width: 200,
            render: (text, record) => (
                <div className="option-sep-container">
                    <Button size="small">
                        <FormattedMessage id="order.common.print.order" />
                    </Button>
                    <NavLink to={`/dashboard/addProduct?pId=${record.id}`}>
                        <FormattedMessage id="common.edit" />
                    </NavLink>
                </div>
            ),
        },
    ];

    return (
        <div className="order-table-container">
            {/* <TableFilter filters={tableFilterProps} onChange={handleCancelFilter} /> */}
            <Table
                size="middle"
                columns={columns}
                dataSource={customers}
                onChange={handleTableChange}
                // pagination={{
                //     total: totalCnt,
                //     pageSize,
                //     current: currentPage,
                //     showQuickJumper: totalCnt / pageSize > showQuickJumper,
                //     showTotal: (total, range) =>
                //         intl.formatMessage({ id: 'customer.showTotal' }, { r1: range[0], r2: range[1], total }),
                // }}
                rowKey={(record) => record.id}
                loading={false}
                scroll={{ x: 800 }}
                rowClassName={(record) => (record.new ? 'new' : null)}
            />
        </div>
    );
};

export default injectIntl(OrderTable);
