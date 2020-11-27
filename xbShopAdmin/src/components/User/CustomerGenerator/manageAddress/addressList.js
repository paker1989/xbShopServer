import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';

import { addAddressGenerator as addressMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import AddressCard from './addressCard';
import useAddresses from './hooks/useAddresses';

import './address.scss';

const AddressList = ({ customerId, intl }) => {
    const dispatch = useDispatch();
    const addressList = useAddresses(customerId);
    const reactHistory = useHistory();
    const location = useLocation();

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    const addAddress = () => {
        if (addressList.length >= 6) {
            message.warn(intl.formatMessage({ id: 'customer.addAddress.max.nb' }, { nb: addressMeta.maxNbAddress }));
            return;
        }
        reactHistory.push({
            pathname: `${location.pathname}/add`,
            search: `?customerId=${customerId}`,
        });
    };

    // handle save status
    useEffect(() => {
        if (backendStatus === '') {
            return;
        }
        if (backendStatus === CustomerActionType._ADDRESS_SAVE_FAILED) {
            message.error(backendMsg);
        }
        dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
    }, [backendStatus, backendMsg]);

    return (
        <div className="address-list">
            <AddressCard.ADD key="add-card" onAdd={addAddress} />
            {addressList.map((item) => {
                return <AddressCard address={item} key={item.idAddress} />;
            })}
        </div>
    );
};

export default injectIntl(AddressList);
// export default AddressList;
