import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import * as CustomerActionCreator from '../../../../../store/action/customerAction';
import * as CustomerActionType from '../../../../../store/actionType/customerActionType';
import { isInt } from '../../../../../utils/data.helper';

import { addAddressGenerator as addressMeta } from '../../../../../static/data/componentMeta/user/addCustomerMeta';

/**
 * return all countries
 */
const useAddresses = (customerId) => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.user.addAddress.addresses);

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    const newAddressId = cookie.load(addressMeta.newUpdateKey);

    addresses.forEach((item) => {
        /* eslint-disable */
        if (newAddressId) {
            item.new = item.idAddress === parseInt(newAddressId, 10);
        }
        /* eslint-enable */
    });

    useEffect(() => {
        const isValidId = isInt(customerId, [-1]);
        if (addresses.length === 0 && isValidId) {
            dispatch(CustomerActionCreator.fetchAddresses({ customerId }));
        }
    }, [customerId, newAddressId]);

    useEffect(() => {
        if (backendStatus === CustomerActionType._ADDRESS_LIST_FETCH_FAILED) {
            message.error(backendMsg);
            dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return addresses;
};

export default useAddresses;
