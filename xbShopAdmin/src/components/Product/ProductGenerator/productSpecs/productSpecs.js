/**
 * 产品规格
 * todo: 1. columns的validators 2. css 3. 剩下的columns
 */
import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Table, Popconfirm, Form, Input, InputNumber } from 'antd';

import * as ProductActionCreator from '../../../../store/action/productActions';
import { getPriceFormatter, getPriceParser } from '../../../../utils/data.helper';
import validators from '../validators';

import './productSpecs.scss';

const ProductSpecs = (props, ref) => {
    const dispatch = useDispatch();
    const { form, specs } = props;
    const { getFieldDecorator } = form;

    const handleDelete = (index) => {
        specs.splice(index, 1);
        dispatch(ProductActionCreator.updateAddProductSpec([...specs]));
    };

    const columns = [
        {
            title: '商品SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (text, record, index) => {
                return (
                    <Form.Item>
                        {getFieldDecorator(`specs[${index}].sku`, {
                            ...validators.specs.sku,
                            initialValue: record.sku,
                        })(<Input placeholder="商品sku" />)}
                    </Form.Item>
                );
            },
        },
        {
            title: '型号/规格',
            dataIndex: 'specType',
            key: 'specType',
            width: '20%',
            render: (text, record, index) => {
                return (
                    <Form.Item>
                        {getFieldDecorator(`specs[${index}].specType`, {
                            ...validators.specs.specType,
                            initialValue: record.specType,
                        })(<Input placeholder="型号/规格" />)}
                    </Form.Item>
                );
            },
        },
        {
            title: '零售价',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index) => {
                return (
                    <Form.Item>
                        {getFieldDecorator(`specs[${index}].price`, {
                            ...validators.specs.price,
                            initialValue: record.price,
                        })(
                            <InputNumber
                                min={0}
                                precision={2}
                                parser={getPriceParser}
                                formatter={getPriceFormatter}
                                placeholder="零售价"
                            />
                        )}
                    </Form.Item>
                );
            },
        },
        {
            title: '库存',
            dataIndex: 'stockNumber',
            key: 'stockNumber',
            render: (text, record, index) => {
                return (
                    <Form.Item>
                        {getFieldDecorator(`specs[${index}].stockNumber`, {
                            ...validators.specs.stockNumber,
                            initialValue: record.stockNumber,
                        })(<InputNumber min={0} placeholder="库存" />)}
                    </Form.Item>
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record, index) =>
                specs.length > 1 ? (
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(index)}>
                        删除
                    </Popconfirm>
                ) : null,
        },
    ];

    return (
        <div className="product-specs" ref={ref}>
            <div>
                <Button type="primary">添加规格</Button>
            </div>
            <div>
                <Table
                    size="middle"
                    columns={columns}
                    dataSource={specs}
                    rowKey={(record) => record.sku}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default forwardRef(ProductSpecs);
