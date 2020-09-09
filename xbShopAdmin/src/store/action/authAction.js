import * as AuthActionType from '../actionType/authActionType';

/**
 * payload example: { loginOpt: 'account', login: 'xb', pwd: 'xxx', ... }
 * @param {*} params
 */
export const login = (params) => ({
    type: AuthActionType._AUTH_LOGIN,
    payload: params,
});

export const logout = (params) => ({
    type: AuthActionType._AUTH_LOGOUT,
    payload: params,
});

/**
 * 自动登录, 发送login,
 * payload example: { userLogin: 'xb', loginType: 'autoLogin' }
 * @param {*} params
 */
export const autoLogin = (params) => ({
    type: AuthActionType._AUTH_AUTO_LOGIN,
    payload: { ...params, loginType: 'autoLogin' },
});

export const resetBackendStatus = () => ({
    type: AuthActionType._AUTH_RESET_BACKEND_STATUS,
    payload: { backendStatus: '', backendMsg: '' },
});
