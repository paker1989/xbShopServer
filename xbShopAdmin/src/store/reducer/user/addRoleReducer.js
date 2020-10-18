/**
 * add role form
 */
import * as userActionType from '../../actionType/userActionType';

const formInitialState = {
    // idRole: -1,
    roleName: '',
    accesses: [],
};

const initialState = {
    ...formInitialState,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionType._USER_ROLE_RESET_STATES:
            return { ...state, ...formInitialState };
        case userActionType._USER_ROLE_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        case userActionType._USER_ROLE_UPDATE_SUCCESS:
        case userActionType._USER_ROLE_UPDATE_FAILED:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_DELETE_USERROLE_SUCCEED:
        case userActionType._USER_ADMIN_DELETE_USERROLE_FAILD:
            return { ...state, ...action.payload };
        case userActionType._USER_ROLE_EDIT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
