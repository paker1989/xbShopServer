import React, { Suspense } from 'react';
import { Typography, Breadcrumb, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { useUnmount } from 'ahooks';
import { FormattedMessage } from 'react-intl';

import ContainerSkeleton from '../../../Common/ContainerSkeleton/containerSkeleton';
import AddressCard from './addressCard';
import AddAddressForm from './addAddressForm';

import * as CustomerActionCreator from '../../../../store/action/customerAction';

const { Title } = Typography;

const ManageAddress = ({ match }) => {
    const dispatch = useDispatch();
    const { url: routerUrl } = match;

    useUnmount(() => {
        dispatch(CustomerActionCreator.resetAddressState());
    });

    return (
        <div className="manage-address-container">
            <div className="prefer-left">
                <Title level={4}>
                    <FormattedMessage id="customer.title.address" />
                </Title>
            </div>
            <div className="xb-breadcrumb-container">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Suspense fallback={<ContainerSkeleton />}>
                <Switch>
                    <Route key="addressHome" path={`${routerUrl}`} exact component={AddressCard.ADD} />
                    <Route key="addAddress" path={`${routerUrl}/add`} component={AddAddressForm} />
                    <Redirect path="*" to={routerUrl} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default withRouter(ManageAddress);
