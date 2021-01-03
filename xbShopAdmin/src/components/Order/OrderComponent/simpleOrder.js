import React from 'react';
import { FormattedMessage } from 'react-intl';

const getColumns = (intl) => {
    // console.log('getColumns');
    return [
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
                const status = { val: 'other' };
                return (
                    <span style={{ color: status.color }}>
                        <FormattedMessage id={`order.status.${status.val}`} />
                    </span>
                );
            },
        },
    ];
};

export default {
    columns: (intl) => getColumns(intl),
};
