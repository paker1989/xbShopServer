/**
 * 产品规格
 */
import React, { forwardRef, useState } from 'react';
import { Button, Table, Popconfirm, Form, Input, InputNumber, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';

import { getDefaultSpec } from '../../../../utils/default.factory';
import { getPriceFormatter, getPriceParser } from '../../../../utils/data.helper';
import getValidators from '../validators';

import './productSpecs.scss';

const ProductSpecs = (props, ref) => {
    const { form, specs, intl } = props;
    const [localSpecs, setLocalSpecs] = useState([...specs]); // 这里必须maintain state specs, 不然validation之后别的状态会丢失状态
    const { getFieldDecorator } = form;
    const validators = getValidators({ intl }); 

    const handleDelete = (index) => {
        localSpecs.splice(index, 1);
        setLocalSpecs([...localSpecs]);
    };

    const addSpec = () => {
        setLocalSpecs([getDefaultSpec(localSpecs.length), ...localSpecs]);
    };

    const columns = [
        {
            title: intl.formatMessage({ id: 'product.spec.sku' }),
            dataIndex: 'sku',
            key: 'sku',
            width: '25%',
            render: (text, record, index) => {
                return (
                    <Form.Item wrapperCol={{ span: 24 }}>
                        {getFieldDecorator(`specs[${index}].sku`, {
                            ...validators.specs.sku,
                            initialValue: record.sku,
                        })(<Input placeholder={intl.formatMessage({ id: 'product.spec.sku' })} />)}
                    </Form.Item>
                );
            },
        },
        {
            title: intl.formatMessage({ id: 'product.spec.type' }),
            dataIndex: 'specType',
            key: 'specType',
            width: '25%',
            render: (text, record, index) => {
                return (
                    <Form.Item wrapperCol={{ span: 24 }}>
                        {getFieldDecorator(`specs[${index}].specType`, {
                            ...validators.specs.specType,
                            initialValue: record.specType,
                        })(<Input placeholder={intl.formatMessage({ id: 'product.spec.type' })} />)}
                    </Form.Item>
                );
            },
        },
        {
            title: intl.formatMessage({ id: 'product.spec.price' }),
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
            title: intl.formatMessage({ id: 'product.spec.stock' }),
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
            title: intl.formatMessage({ id: 'common.delete' }),
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record, index) => (
                <Popconfirm
                    title={intl.formatMessage({ id: 'common.delete.confirm' })}
                    onConfirm={() => handleDelete(index)}
                >
                    <span className="product-spec-form-item clickable danger inline-block">
                        {intl.formatMessage({ id: 'common.delete' })}
                    </span>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="product-specs" ref={ref}>
            <Row>
                <Col span={24}>
                    <Button type="primary" onClick={addSpec}>
                        {intl.formatMessage({ id: 'product.spec.add' })}
                    </Button>
                </Col>
            </Row>
            <Row style={{ margin: '24px 0' }}>
                <Col xl={{ span: 24 }} xxl={{ span: 18 }}>
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

export default injectIntl(forwardRef(ProductSpecs));
