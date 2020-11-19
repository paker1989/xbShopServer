import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import { useUnmount } from 'ahooks';

import ContainerSkeleton from '../../../Common/ContainerSkeleton/containerSkeleton';
import AddressCard from './addressCard';
import AddAddressForm from './addAddressForm';

import * as CustomerActionCreator from '../../../../store/action/customerAction';

const ManageAddress = ({ match }) => {
    const dispatch = useDispatch();
    const { url: routerUrl } = match;

    useUnmount(() => {
        dispatch(CustomerActionCreator.resetAddressState());
    });

    return (
        <Suspense fallback={<ContainerSkeleton />}>
            <Switch>
                <Route key="addressHome" path={`${routerUrl}`} exact component={AddressCard.ADD} />
                <Route key="addAddress" path={`${routerUrl}/add`} component={AddAddressForm} />
                <Redirect path="*" to={routerUrl} />
            </Switch>
        </Suspense>
    );
};

export default withRouter(ManageAddress);
