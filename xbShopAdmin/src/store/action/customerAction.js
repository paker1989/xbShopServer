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

/**
 * params example: { editMode: true, idAddress : 3 }
 * @param {*} params
 */
export const setAddressEditMode = (params) => ({
    type: CustomerActionType._ADDRESS_SET_EDIT_MODE,
    payload: params,
});
