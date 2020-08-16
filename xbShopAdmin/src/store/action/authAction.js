import * as AuthActionType from '../actionType/authActionType';

export const login = (params) => ({
    type: AuthActionType._AUTH_LOGIN,
    payload: params,
});
