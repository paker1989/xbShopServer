import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { useMount } from 'ahooks';
import { Button, Card, Row, Col, Tabs, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import ListTable from './productListTable';
import BulkActionSelector from './bulkActionSelector';

import productListMeta from '../../../static/data/componentMeta/product/productListMeta';
import * as ProductActionCreator from '../../../store/action/productActions';
import * as ProductActionType from '../../../store/actionType/productActionType';

const { TabPane } = Tabs;
/**
 * default home page
 */
const ProductList = ({ intl }) => {
    const dispatch = useDispatch();
    const fetchedProducts = useSelector((state) => state.product.productListReducer.fetchedProducts);
    const backendMsg = useSelector((state) => state.product.productListReducer.backendMsg);
    const backendStatus = useSelector((state) => state.product.productListReducer.backendStatus);

    const [loading, setLoading] = useState(fetchedProducts.length === 0);
    const [currentTab, setCurrentTab] = useState('all');

    const { title, description } = productListMeta;

    // side-effects
    useMount(() => {
        setLoading(true);
        dispatch(ProductActionCreator.fetchProductList({}));
    });

    useEffect(() => {
        switch (backendStatus) {
            case ProductActionType._FETCH_PRODUCT_FAIL:
            case ProductActionType._BULK_UPDATE_FAIL:
                message.error(backendMsg);
                dispatch({ type: ProductActionType._RESET_LIST_BACKEND_STATUS });
                setLoading(false);
                break;
            case ProductActionType._FETCH_PRODUCT_SUCCESS:
            case ProductActionType._BULK_UPDATE_SUCCESS:
                dispatch({ type: ProductActionType._RESET_LIST_BACKEND_STATUS });
                setLoading(false);
                break;
            default:
                break;
        }
    }, [backendMsg, backendStatus]);

    const onTabClick = (tab) => {
        setLoading(true);
        setCurrentTab(tab);
        dispatch(
            ProductActionCreator.fetchProductList({
                filter: tab, // all, sell, soldout, offShelf
            })
        );
    };

    const handleBulkActionSelect = (action, selectedItems) => {
        setLoading(true);
        dispatch(
            ProductActionCreator.bulkUpdateProducts({
                action,
                pks: selectedItems,
                filter: currentTab,
            })
        );
    };

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
                            <BulkActionSelector onSelect={handleBulkActionSelect} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tabs activeKey={currentTab} onTabClick={onTabClick}>
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
                            <ListTable fetchedProducts={fetchedProducts} loading={loading} />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(ProductList);
