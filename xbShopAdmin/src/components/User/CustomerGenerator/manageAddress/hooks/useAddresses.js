import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import * as CustomerActionCreator from '../../../../../store/action/customerAction';
import * as CustomerActionType from '../../../../../store/actionType/customerActionType';
import { isInt } from '../../../../../utils/data.helper';

/**
 * return all countries
 */
const useAddresses = (customerId) => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.user.addAddress.addresses);

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    useEffect(() => {
        const isValidId = isInt(customerId, [-1]);
        if (addresses.length === 0 && isValidId) {
            dispatch(CustomerActionCreator.fetchAddresses({ customerId }));
        }
    }, [customerId]);

    useEffect(() => {
        if (backendStatus === CustomerActionType._ADDRESS_LIST_FETCH_FAILED) {
            message.error(backendMsg);
            dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return addresses;
};

export default useAddresses;
