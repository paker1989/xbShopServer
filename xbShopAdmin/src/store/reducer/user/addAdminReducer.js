/**
 * add admin form
 */
import * as userActionType from '../../actionType/userActionType';

const formInitialState = {
    idRole: undefined,
    isActive: true,
    phoneNumber: '',
    email: '',
    defaultPage: undefined,
    password: '',
    passwordRepeat: '',
};

const initialState = {
    ...formInitialState,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionType._USER_ADMIN_RESET_STATES:
            return { ...state, ...formInitialState };
        case userActionType._USER_ADMIN_UPDATE_SUCCESS:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_UPDATE_FAILED:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_UPDATE_STATES:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
