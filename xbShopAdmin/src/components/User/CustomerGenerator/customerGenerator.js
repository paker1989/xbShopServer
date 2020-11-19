import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Row, Col } from 'antd';
import { useUnmount } from 'ahooks';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';

import ContainerSkeleton from '../../Common/ContainerSkeleton/containerSkeleton';
import AddCustomerForm from './addCustomerForm/addCustomerForm';
import ManageAddress from './manageAddress/manageAddress';
import SideBar from './customerSideBar';

import * as CustomerCmnActionType from '../../../store/actionType/customerActionType';

import './customerGenerator.scss';

const CustomerGenerator = ({ match }) => {
    const { url: routerUrl } = match;
    const dispatch = useDispatch();

    useUnmount(() => {
        dispatch({ type: CustomerCmnActionType._CUSTOMER__GLOBAL_RESET });
    });

    return (
        <div className="customer-generator">
            <div className="addCustomer-form-wrapper section-container">
                <Card bordered={false}>
                    <Row type="flex">
                        <Col xs={24} sm={8} md={6} lg={4} className="sidebar-container">
                            <SideBar />
                        </Col>
                        <Col
                            xs={24}
                            sm={{ span: 15, offset: 1 }}
                            md={{ span: 17, offset: 1 }}
                            lg={{ span: 19, offset: 1 }}
                        >
                            <Suspense fallback={<ContainerSkeleton />}>
                                <Switch>
                                    <Route key="basic" path={`${routerUrl}`} exact component={AddCustomerForm} />
                                    <Route key="address" path={`${routerUrl}/address`} component={ManageAddress} />
                                    <Redirect path="*" to={routerUrl} />
                                </Switch>
                            </Suspense>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default withRouter(CustomerGenerator);
