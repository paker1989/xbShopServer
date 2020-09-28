import * as UserActionType from '../actionType/userActionType';

export const resetAddAdminStates = () => ({
    type: UserActionType._USER_ADMIN_RESET_STATES,
});

/**
 * payload example: { email, defaultPage, idRole, isActive, password, phoneNumber }
 * @param {*} params
 */
export const submitAdminEdition = (params) => ({
    type: UserActionType._USER_ADMIN_UPDATE,
    payload: params,
});
