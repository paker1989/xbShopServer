/**
 * 产品规格
 */
import React, { forwardRef, useState } from 'react';
import { Button, Table, Popconfirm, Form, Input, InputNumber, Row, Col } from 'antd';

import { getDefaultSpec } from '../../../../utils/default.factory';
import { getPriceFormatter, getPriceParser } from '../../../../utils/data.helper';
import validators from '../validators';

import './productSpecs.scss';

const ProductSpecs = (props, ref) => {
    const { form, specs } = props;
    const [localSpecs, setLocalSpecs] = useState([...specs]); // 这里必须maintain state specs, 不然validation之后别的状态会丢失状态
    const { getFieldDecorator } = form;

    const handleDelete = (index) => {
        localSpecs.splice(index, 1);
        setLocalSpecs([...localSpecs]);
    };

    const addSpec = () => {
        setLocalSpecs([getDefaultSpec(localSpecs.length), ...localSpecs]);
    };

    const columns = [
        {
            title: '商品SKU',
            dataIndex: 'sku',
            key: 'sku',
            width: '25%',
            render: (text, record, index) => {
                return (
                    <Form.Item wrapperCol={{ span: 24 }}>
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
            width: '25%',
            render: (text, record, index) => {
                return (
                    <Form.Item wrapperCol={{ span: 24 }}>
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
            width: '15%',
            render: (text, record, index) => {
                return (
                    <Form.Item wrapperCol={{ span: 24 }}>
                        {getFieldDecorator(`specs[${index}].price`, {
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
            width: '15%',
            render: (text, record, index) => {
                return (
                    <Form.Item wrapperCol={{ span: 24 }}>
                        {getFieldDecorator(`specs[${index}].stockNumber`, {
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
            render: (text, record, index) => (
                <Popconfirm title="确定删除?" onConfirm={() => handleDelete(index)} cancelText="取消" okText="确定">
                    <span className="product-spec-form-item clickable danger inline-block">删除</span>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="product-specs" ref={ref}>
            <Row>
                <Col span={24}>
                    <Button type="primary" onClick={addSpec}>
                        添加规格
                    </Button>
                </Col>
            </Row>
            <Row style={{ margin: '24px 0' }}>
                <Col lg={{ span: 24 }} xl={{ span: 18 }}>
                    <Table
                        size="large"
                        columns={columns}
                        dataSource={localSpecs}
                        rowKey={(record) => record.tmpId || record.sku}
                        pagination={false}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default forwardRef(ProductSpecs);
