import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import * as CustomerActionCreator from '../../../../../store/action/customerAction';
import * as CustomerActionType from '../../../../../store/actionType/customerActionType';

/**
 * return all regions $ departments for auto completes
 */
const useAvailableRegions = (countryCode, searchStr) => {
    const dispatch = useDispatch();
    const regionAvailables = useSelector((state) => state.user.addAddress.regionAvailables);

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    useEffect(() => {
        if (countryCode.length > 0) {
            if (searchStr.trim().length < 2) {
                if (regionAvailables.length > 0) {
                    dispatch(CustomerActionCreator.putGeoAutoComplete({ type: 'region', data: [] }));
                }
            } else {
                dispatch(CustomerActionCreator.fetchGeoAutoComplete({ type: 'region', countryCode, searchStr }));
            }
        }
    }, [countryCode, searchStr]);

    useEffect(() => {
        if (backendStatus === CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED) {
            message.error(backendMsg);
            dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return regionAvailables;
};

export default useAvailableRegions;
