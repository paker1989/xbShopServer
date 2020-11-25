import React, { Suspense, useEffect } from 'react';
import { Typography, Breadcrumb, message } from 'antd';
import { useDispatch } from 'react-redux';
import { withRouter, Switch, Redirect, Route, NavLink } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import ContainerSkeleton from '../../../Common/ContainerSkeleton/containerSkeleton';
import AddressList from './addressList';
import AddAddressForm from './addAddressForm';

import { addAddressGenerator as addressMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import useBreadcrumb from './hooks/useBreadcrumb';
import { getUrlParameter } from '../../../../utils/url.helper';

const { Title } = Typography;
const { routes } = addressMeta;

const ManageAddress = ({ match, history, intl }) => {
    const dispatch = useDispatch();
    const { url: routerUrl } = match;
    const customerId = getUrlParameter('customerId') || -1;

    const breadcrumbs = useBreadcrumb();

    useEffect(() => {
        if (customerId === -1) {
            message.error(intl.formatMessage({ id: 'common.error.param.addAddress' }));
            history.push('/dashboard/customerList');
        }
        return () => {
            dispatch(CustomerActionCreator.resetAddressState());
        };
    }, []);

    return (
        <div className="manage-address-container">
            <div className="prefer-left">
                <Title level={4}>
                    <FormattedMessage id="customer.title.address" />
                </Title>
            </div>
            <div className="xb-breadcrumb-container">
                <Breadcrumb separator=">">
                    {breadcrumbs.map((bc) => (
                        <Breadcrumb.Item key={bc.label}>
                            {bc.path ? (
                                <NavLink to={bc.path}>
                                    <FormattedMessage id={`customer.address.bc.${bc.label}`} />
                                </NavLink>
                            ) : (
                                <FormattedMessage id={`customer.address.bc.${bc.label}`} />
                            )}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
            <Suspense fallback={<ContainerSkeleton />}>
                <Switch>
                    <Route
                        key="addressHome"
                        path={`${routerUrl}${routes.basic}`}
                        exact
                        render={() => <AddressList customerId={customerId} />}
                    />
                    <Route key="addAddress" path={`${routerUrl}${routes.add}`} component={AddAddressForm} />
                    <Redirect path="*" to={routerUrl} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default injectIntl(withRouter(ManageAddress));
