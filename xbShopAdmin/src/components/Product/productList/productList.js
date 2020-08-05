import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Card, Row, Col, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import ListTable from './productListTable';
import BulkActionSelector from './bulkActionSelector';

import productListMeta from '../../../static/data/componentMeta/product/productListMeta';

const { TabPane } = Tabs;
/**
 * default home page
 */
const ProductList = ({ intl }) => {
    const { title, description } = productListMeta;

    return (
        <div className="product-home">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary">
                        <NavLink to="/dashboard/addProduct">{intl.formatMessage({ id: 'product.add' })}</NavLink>
                    </Button>
                }
            />
            <div className="section-container">
                <Card bordered={false}>
                    <Row>
                        <Col>
                            <BulkActionSelector />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="all">
                                <TabPane
                                    tab={intl.formatMessage({ id: 'product.list.allproduct' })}
                                    key="all"
                                ></TabPane>
                                <TabPane tab={intl.formatMessage({ id: 'product.list.selling' })} key="sell"></TabPane>
                                <TabPane
                                    tab={intl.formatMessage({ id: 'product.list.soldout' })}
                                    key="soldout"
                                ></TabPane>
                                <TabPane
                                    tab={intl.formatMessage({ id: 'product.list.offShelf' })}
                                    key="offShelf"
                                ></TabPane>
                            </Tabs>
                        </Col>
                        <Col>
                            <ListTable />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(ProductList);
