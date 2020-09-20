import * as UserActionType from '../actionType/userActionType';

/**
 * payload example: { loginOpt: 'account', login: 'xb', pwd: 'xxx', ... }
 * @param {*} params
 */
export const resetAddAdminStates = () => ({
    type: UserActionType._USER_ADMIN_RESET_STATES,
});
