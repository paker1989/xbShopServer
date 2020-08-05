import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Table } from 'antd';

const ProductListTable = ({ intl }) => {
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idProduct',
            key: 'idProduct',
        },
        {
            title: intl.formatMessage({ id: 'product.list.thumbnail' }),
            dataIndex: 'thumbnail',
            key: 'thumbnail',
        },
        {
            title: intl.formatMessage({ id: 'product.name' }),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: intl.formatMessage({ id: 'product.spec.stock' }),
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: intl.formatMessage({ id: 'product.list.shelfStatus' }),
            dataIndex: 'onsell',
            key: 'onsell',
        },
        {
            title: intl.formatMessage({ id: 'common.operation' }),
            dataIndex: 'operation',
            key: 'operation',
        },
    ];

    return (
        <div>
            <Table size="large" columns={columns} loading={loading} />
        </div>
    );
};

export default injectIntl(ProductListTable);
