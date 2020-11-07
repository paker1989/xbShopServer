import * as CustomerActionType from '../actionType/customerActionType';

export const saveCustomer = (options) => ({
    type: CustomerActionType._SAVE_CUSTOMER,
    payload: options,
});
