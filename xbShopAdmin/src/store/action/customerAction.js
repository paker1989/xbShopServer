import * as CustomerActionType from '../actionType/customerActionType';

export const saveCustomer = (options) => ({
    type: CustomerActionType._SAVE_CUSTOMER,
    payload: options,
});

export const resetCustomerSaveBackendStatus = () => ({
    type: CustomerActionType._CUSTOMER_SAVE_RESET_BACKEND_STATUS,
    payload: { backendStatus: '', backendMsg: '' },
});

export const resetAddressSaveBackendStatus = () => ({
    type: CustomerActionType._ADDRESS_SAVE_RESET_BACKEND_STATUS,
    payload: { backendStatus: '', backendMsg: '' },
});

export const resetAddressState = () => ({
    type: CustomerActionType._ADDRESS_RESET_STATE,
});

export const fetchCountries = () => ({
    type: CustomerActionType._GLOBAL_FETCH_CONSTANT,
    payload: { type: 'country' },
});

export const fetchGeoAutoComplete = ({ type, countryCode, searchStr }) => ({
    type: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE,
    payload: { type, countryCode, searchStr },
});

export const putGeoAutoComplete = ({ type, data }) => ({
    type: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_SUCCESS,
    payload: { type, data },
});

export const computeEditAddress = (address) => {
    const { addr1, addr2, postCode, city, region, countryCode, phone, recipient, instruction } = address;
    return {
        type: CustomerActionType._ADDRESS_COMPUTE_EDITION,
        payload: {
            addr1,
            addr2,
            phone,
            recipient,
            postCode,
            city,
            region,
            countryCode,
            instruction,
        },
    };
};

export const fetchAddressDetail = ({ addressId, customerId }) => ({
    type: CustomerActionType._ADDRESS_FETCH_DETAIL,
    payload: { addressId, customerId },
});

/**
 * params example:
 * @param {*} params
 */
export const saveAddress = (params) => ({
    type: CustomerActionType._ADDRESS_SAVE,
    payload: params,
});

/**
 * params example:
 * @param {*} params
 */
export const fetchAddresses = (params) => ({
    type: CustomerActionType._ADDRESS_LIST_FETCH,
    payload: params,
});
