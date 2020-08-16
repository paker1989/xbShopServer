import * as AuthActionType from '../../actionType/authActionType';
import { saveAuthUser } from '../../../utils/auth.helper';

const initialState = {
    loginOpt: 'account', // account, mobile
    rememberMe: false,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AuthActionType._AUTH_LOGIN_SUCCESS:
            /* eslint-disable */
            const { authUser, backendStatus } = action.payload;
            /* eslint-enable */
            saveAuthUser(authUser);
            return { ...state, backendStatus };
        case AuthActionType._AUTH_LOGIN_FAIL:
            return { ...state, ...action.payload };
        case AuthActionType._AUTH_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
