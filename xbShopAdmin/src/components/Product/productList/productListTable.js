import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { useMount } from 'ahooks';

import * as ProductActionCreator from '../../../store/action/productActions';

const ProductListTable = ({ intl }) => {
    // states
    const dispatch = useDispatch();

    const stockCreteria = useSelector((state) => state.product.productListReducer.stockCreteria);
    const soldCreteria = useSelector((state) => state.product.productListReducer.soldCreteria);
    const selectedProducts = useSelector((state) => state.product.productListReducer.selectedProducts);
    const fetchedProducts = useSelector((state) => state.product.productListReducer.fetchedProducts);
    const totalCnt = useSelector((state) => state.product.productListReducer.totalCnt);

    const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);

    // side-effects
    useMount(() => {
        // console.log('mount');
        dispatch(
            ProductActionCreator.fetchProductList({
                limit: 50,
                page: 1,
                sortedCreteria: 'stock',
                sortedOrder: 'desc',
                sku: '',
                name: '',
            })
        );
    });

    // methods
    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
    };

    const productSelections = {
        selectedRowKeys: selectedProducts,
        onChange: (selectedRowKeys) => {
            console.log('on selection');
        },
    };

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
            sorter: true,
        },
        {
            title: intl.formatMessage({ id: 'product.list.solded' }),
            dataIndex: 'solded',
            key: 'solded',
            sorter: true,
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

    const expandedRowRender = (record, index, indent, expanded) => {
        console.log(record);
        const specColumn = [
            { title: intl.formatMessage({ id: 'product.spec.sku' }), dataIndex: 'sku', key: 'sku' },
            { title: intl.formatMessage({ id: 'product.spec.type' }), dataIndex: 'specType', key: 'specType' },
            {
                title: intl.formatMessage({ id: 'product.spec.price' }),
                dataIndex: 'price',
                key: 'price',
            },
            { title: intl.formatMessage({ id: 'product.spec.stock' }), dataIndex: 'stockNumber', key: 'stockNumber' },
        ];
        const data = [];
        return <Table columns={specColumn} dataSource={data} pagination={false} />;
    };

    return (
        <div>
            <Table
                size="large"
                columns={columns}
                loading={loading}
                onChange={handleTableChange}
                rowSelection={productSelections}
                dataSource={fetchedProducts}
                pagination={{
                    total: totalCnt,
                }}
                expandedRowRender={expandedRowRender}
            />
        </div>
    );
};

export default injectIntl(ProductListTable);
