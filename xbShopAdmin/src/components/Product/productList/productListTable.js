import React, { useEffect } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Table, message, Row, Col, Switch, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

import * as ProductActionType from '../../../store/actionType/productActionType';
import * as ProductActionCreator from '../../../store/action/productActions';

import './productList.scss';

const ProductListTable = ({ intl, fetchedProducts = [], loading }) => {
    // states
    const dispatch = useDispatch();
    const selectedProducts = useSelector((state) => state.product.productListReducer.selectedProducts);
    const totalCnt = useSelector((state) => state.product.productListReducer.totalCnt);
    // const currentPage = useSelector((state) => state.product.productListReducer.currentPage);

    // methods
    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
        
    };

    const productSelections = {
        selectedRowKeys: selectedProducts,
        onChange: (selectedRowKeys) => {
            dispatch(ProductActionCreator.selectProducts(selectedRowKeys));
        },
    };

    const handleOnShelfChange = (idProduct, index, checked) => {
        console.log('idProduct = ' + idProduct);
        console.log('index = ' + index);
        console.log('checked = ' + checked);
        
    };

    const handleDelete = (idProduct) => {
        console.log('idProduct = ' + idProduct);
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
            render: (text, record, index) => {
                return (
                    <Switch
                        checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                        unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                        checked={text === 0}
                        onChange={(checked) => handleOnShelfChange(record.idProduct, index, checked)}
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

    const expandedRowRender = (record, index, indent, expanded) => {
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
                dataSource={fetchedProducts}
                pagination={{
                    total: totalCnt,
                    pageSize: 1,
                }}
                rowKey={(record) => record.idProduct}
                expandedRowRender={expandedRowRender}
                scroll={{ x: 1000 }}
            />
        </div>
    );
};

export default injectIntl(ProductListTable);
