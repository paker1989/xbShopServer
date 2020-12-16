import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import * as CustomerActionCreator from '../../../../../store/action/customerAction';
import * as CustomerActionType from '../../../../../store/actionType/customerActionType';

/**
 * return all countries
 */
const useCountryList = () => {
    const dispatch = useDispatch();
    const countryList = useSelector((state) => state.user.customerCmn.countryList);

    const backendStatus = useSelector((state) => state.user.customerCmn.backendStatus);
    const backendMsg = useSelector((state) => state.user.customerCmn.backendMsg);

    useEffect(() => {
        if (countryList.length === 0) {
            dispatch(CustomerActionCreator.fetchCountries());
        }
    }, []);

    useEffect(() => {
        if (backendStatus === CustomerActionType._GLOBAL_FETCH_CONSTANT_FAILED) {
            message.error(backendMsg);
            dispatch({ type: CustomerActionType._CUSTOMER__GLOBAL_RESET_BACKENDSTATUS });
        }
    }, [backendStatus, backendMsg]);

    return countryList;
};

export default useCountryList;
