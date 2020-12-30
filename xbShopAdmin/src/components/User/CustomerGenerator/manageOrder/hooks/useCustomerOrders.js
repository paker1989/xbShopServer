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
const useCustomerOrders = (customerId) => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.user.customerCmn.addresses);

    const backendStatus = useSelector((state) => state.user.customerCmn.backendStatus);
    const backendMsg = useSelector((state) => state.user.customerCmn.backendMsg);

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
            dispatch({ type: CustomerActionType._CUSTOMER__GLOBAL_RESET_BACKENDSTATUS });
        }
    }, [backendStatus, backendMsg]);

    return addresses;
};

export default useCustomerOrders;
