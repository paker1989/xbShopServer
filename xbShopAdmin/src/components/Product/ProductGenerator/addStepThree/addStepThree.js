import React from 'react';
import { Result, Button, Descriptions, Row, Col, Tag } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import useProductHL from '../../../../utils/hooks/useProductHighLight';
import { productGenerator } from '../../../../static/data/componentMeta/product/addProductMeta';
import * as productActionCreator from '../../../../store/action/productActions';

import './addStepThree.scss';

const AddStepThree = ({ intl }) => {
    const dispatch = useDispatch();
    const reEdite = () => dispatch(productActionCreator.reEditeProductSpec);

    const productHighLight = useProductHL(true);

    return (
        <React.Fragment>
            <Row>
                <Col {...productGenerator.stepThreeLayout}>
                    <Result
                        status="success"
                        title={intl.formatMessage({ id: 'product.add.success' })}
                        extra={[
                            <Button type="primary" size="large" key="1" onClick={reEdite}>
                                <FormattedMessage id="common.return.edition" />
                            </Button>,
                            <Button size="large" key="2">
                                <FormattedMessage id="common.return.list" />
                            </Button>,
                        ]}
                    />
                </Col>
            </Row>
            <Row>
                <Col {...productGenerator.stepThreeLayout}>
                    <div className="hl-container">
                        <Descriptions
                            title={intl.formatMessage({ id: 'product.general.info' })}
                            style={{ textAlign: 'left' }}
                            column={1}
                        >
                            <Descriptions.Item label={intl.formatMessage({ id: 'product.name' })}>
                                {productHighLight.productName}
                            </Descriptions.Item>
                            <Descriptions.Item label={intl.formatMessage({ id: 'product.shortdscp' })}>
                                {productHighLight.shortDscp}
                            </Descriptions.Item>
                            <Descriptions.Item label={intl.formatMessage({ id: 'product.spec.stock' })}>
                                {productHighLight.stockRange}
                            </Descriptions.Item>
                            <Descriptions.Item label={intl.formatMessage({ id: 'product.general.pricerange' })}>
                                {productHighLight.priceRange}
                            </Descriptions.Item>
                            <Descriptions.Item label={intl.formatMessage({ id: 'product.category' })}>
                                {productHighLight.categories.map((item) => (
                                    <Tag title={item.label} key={item.id} color="purple">
                                        {item.label}
                                    </Tag>
                                ))}
                            </Descriptions.Item>
                            <Descriptions.Item label={intl.formatMessage({ id: 'product.spec.type' })}>
                                {productHighLight.specs.map((item) => (
                                    <Tag title={item.specType} key={item.specType} color="volcano">
                                        {item.specType}
                                    </Tag>
                                ))}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default injectIntl(AddStepThree);
