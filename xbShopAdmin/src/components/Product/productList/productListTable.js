import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Col, Switch, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

import productListMeta from '../../../static/data/componentMeta/product/productListMeta';
import * as ProductActionCreator from '../../../store/action/productActions';

import './productList.scss';

const { pageSize } = productListMeta;

const ProductListTable = ({ intl, fetchedProducts = [], loading, handleChange }) => {
    // states
    const dispatch = useDispatch();
    const selectedProducts = useSelector((state) => state.product.productListReducer.selectedProducts);
    const totalCnt = useSelector((state) => state.product.productListReducer.totalCnt);
    const currentPage = useSelector((state) => state.product.productListReducer.currentPage);
    const startPage = useSelector((state) => state.product.productListReducer.startPage);

    const displayedProducts = fetchedProducts.slice(
        (currentPage - startPage) * pageSize,
        (currentPage - startPage) * pageSize + pageSize
    );

    // methods
    const handleTableChange = (/* pagination, filters, sorter */) => {
        // console.log(pagination);
        // console.log(filters);
        // console.log(sorter);
    };

    const productSelections = {
        selectedRowKeys: selectedProducts,
        onChange: (selectedRowKeys) => {
            dispatch(ProductActionCreator.selectProducts(selectedRowKeys));
        },
    };

    const handleDelete = (/* idProduct */) => {
        // console.log('idProduct = ' + idProduct);
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
            render: (text, record) => {
                // console.log(text);
                return <img className="thumbnail" src={text} alt={record.productName} />;
            },
        },
        {
            title: intl.formatMessage({ id: 'product.name' }),
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: intl.formatMessage({ id: 'product.spec.stock' }),
            dataIndex: 'totalStock',
            key: 'totalStock',
            sorter: true,
        },
        // {
        //     title: intl.formatMessage({ id: 'product.list.solded' }),
        //     dataIndex: 'solded',
        //     key: 'solded',
        //     sorter: true,
        // },
        {
            title: intl.formatMessage({ id: 'product.list.shelfStatus' }),
            dataIndex: 'isOffshelf',
            key: 'isOffshelf',
            render: (text, record) => {
                return (
                    <Switch
                        checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                        unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                        checked={text === 0}
                        onChange={(checked) => {
                            handleChange(record.idProduct, checked ? 'onShelf' : 'offShelf');
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
                            onConfirm={() => handleDelete(record.idProduct)}
                        >
                            <span className="clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.delete' })}
                            </span>
                        </Popconfirm>
                        <NavLink to={`/dashboard/addProduct/${record.idProduct}`}>
                            <FormattedMessage id="common.edit" />
                        </NavLink>
                    </div>
                );
            },
        },
    ];

    const expandedRowRender = (record /* index, indent, expanded */) => {
        // console.log(record);
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
        const data = (record && record.specs) || [];
        return (
            <Row>
                <Col md={24} lg={16}>
                    <Table columns={specColumn} dataSource={data} pagination={false} rowKey={(rcd) => rcd.sku} />
                </Col>
            </Row>
        );
    };

    return (
        <div className="product-list-table">
            <Table
                size="large"
                columns={columns}
                loading={loading}
                onChange={handleTableChange}
                rowSelection={productSelections}
                dataSource={displayedProducts}
                pagination={{
                    total: totalCnt,
                    pageSize,
                    current: currentPage,
                }}
                rowKey={(record) => record.idProduct}
                expandedRowRender={expandedRowRender}
                scroll={{ x: 1000 }}
            />
        </div>
    );
};

export default injectIntl(ProductListTable);
