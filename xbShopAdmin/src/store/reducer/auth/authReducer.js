import * as AuthActionType from '../../actionType/authActionType';

const initialState = {
    loginOpt: 'account', // account, mobile
    rememberMe: false,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AuthActionType._AUTH_LOGIN_SUCCESS:
        case AuthActionType._AUTH_LOGOUT_SUCCESS:
            /* eslint-disable */
            const { backendStatus } = action.payload;
            /* eslint-enable */
            return { ...state, backendStatus };
        case AuthActionType._AUTH_LOGIN_FAIL:
            return { ...state, ...action.payload };
        case AuthActionType._AUTH_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
