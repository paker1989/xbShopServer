import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import * as CustomerActionCreator from '../../../../../store/action/customerAction';
import * as CustomerActionType from '../../../../../store/actionType/customerActionType';

/**
 * return all regions $ departments for auto completes
 */
const useAvailableAutos = (countryCode, searchStr, type) => {
    const dispatch = useDispatch();
    const autoAvailables = useSelector((state) =>
        type === 'region' ? state.user.addAddress.regionAvailables : state.user.addAddress.cityAvailables
    );

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    useEffect(() => {
        if (countryCode.length > 0) {
            if (searchStr.trim().length < 2) {
                if (autoAvailables.length > 0) {
                    dispatch(CustomerActionCreator.putGeoAutoComplete({ type, data: [] }));
                }
            } else {
                dispatch(CustomerActionCreator.fetchGeoAutoComplete({ type, countryCode, searchStr }));
            }
        }
    }, [countryCode, searchStr]);

    useEffect(() => {
        if (backendStatus === CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED) {
            message.error(backendMsg);
            dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return autoAvailables;
};

export default useAvailableAutos;
