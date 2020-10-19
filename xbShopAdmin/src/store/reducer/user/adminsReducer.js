/**
 * add product form
 */
import * as userActionType from '../../actionType/userActionType';

const initialState = {
    allUserRoles: [],
    allUserAccesses: [],
    allAdmins: [],
    activeTab: 'team', // team or role
    teamSubTab: 'all', // all or deleted
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionType._USER_ADMIN_PUT_ALL_USERROLES:
            return { ...state, ...action.payload };
        case userActionType._USER_ROLE_PUT_ALL_USERACCESSES:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_SET_TEAM_TAB:
            return { ...state, ...action.payload };
        case userActionType._USER_ROLE_FETCH_ALL_USERACCESSES_FAILED:
        case userActionType._USER_ADMIN_FETCH_ALL_USERROLES_FAILED:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMINS_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_FETCH_ALL_SUCCESS:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_SWITCH_SUB_TAB:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
