import * as UserActionType from '../actionType/userActionType';

export const resetAddAdminStates = () => ({
    type: UserActionType._USER_ADMIN_RESET_STATES,
});

export const resetAddRoleStates = () => ({
    type: UserActionType._USER_ROLE_RESET_STATES,
});

export const resetAddAdminBackendStatus = () => ({
    type: UserActionType._USER_ADMIN_RESET_BACKEND_STATUS,
    payload: {
        backendStatus: '',
        backendMsg: '',
    },
});

export const resetAddRoleBackendStatus = () => ({
    type: UserActionType._USER_ROLE_RESET_BACKEND_STATUS,
    payload: {
        backendStatus: '',
        backendMsg: '',
    },
});

export const resetAdminsBackendStatus = () => ({
    type: UserActionType._USER_ADMINS_RESET_BACKEND_STATUS,
    payload: {
        backendStatus: '',
        backendMsg: '',
    },
});

/**
 * payload example: { email, defaultPage, idRole, isActive, password, phoneNumber }
 * @param {*} params
 */
export const submitAdminEdition = (params) => ({
    type: UserActionType._USER_ADMIN_UPDATE,
    payload: params,
});

/**
 * @param {*} params
 */
export const fetchAllUserroles = () => ({
    type: UserActionType._USER_ADMIN_FETCH_ALL_USERROLES,
});

/**
 * @param {*} params
 */
export const fetchAllUserAccesses = () => ({
    type: UserActionType._USER_ROLE_FETCH_ALL_USERACCESSES,
});

export const attemptDeleteUserrole = (params) => ({
    type: UserActionType._USER_ADMIN_ATTEMPT_DELETE_USERROLE,
    payload: params,
});

export const setActiveTeamListTab = (activeTab) => ({
    type: UserActionType._USER_ADMIN_SET_TEAM_TAB,
    payload: { activeTab },
});

export const submitRoleEdition = (params) => ({
    type: UserActionType._USER_ROLE_UPDATE,
    payload: params,
});

export const editUserRole = (params) => ({
    type: UserActionType._USER_ROLE_EDIT,
    payload: params,
});
