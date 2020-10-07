import axios from 'axios';
import { put } from 'redux-saga/effects';
import cookie from 'react-cookies';

import { roleGenerator } from '../../../static/data/componentMeta/user/addRoleMeta';
import * as UserActionType from '../../actionType/userActionType';
import { getRequestUrl } from '../../../static/api';

// axios.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         // return Promise.reject(error);
//     }
// );

/**
 * updateAdmin saga,
 * @param {*} reqObj
 */
export function* updateAdminSaga(reqObj) {
    // debugger;
    try {
        const res = yield axios.post(
            getRequestUrl('auth', 'updateAdmin'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            yield put({
                type: UserActionType._USER_ADMIN_UPDATE_SUCCESS,
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_UPDATE_SUCCESS,
                },
            });
        } else {
            yield put({
                type: UserActionType._USER_ADMIN_UPDATE_FAILED,
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_UPDATE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: UserActionType._USER_ADMIN_UPDATE_FAILED,
            payload: {
                backendStatus: UserActionType._USER_ADMIN_UPDATE_FAILED,
                backendMsg: error.message,
            },
        });
    }
}

/**
 * updateRole saga,
 * @param {*} reqObj
 */
export function* updateRoleSaga(reqObj) {
    try {
        const res = yield axios.post(
            getRequestUrl('auth', 'updateRole'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            // cookie.setItem('newUserRoleId', res.data.idRole);
            cookie.save(roleGenerator.newUpdateKey, res.data.idRole, { maxAge: roleGenerator.newUpdateMaxAge });
            yield put({
                // fetch all userroles for update
                type: UserActionType._USER_ADMIN_FETCH_ALL_USERROLES,
            });
            yield put({
                type: UserActionType._USER_ROLE_UPDATE_SUCCESS,
                payload: {
                    backendStatus: UserActionType._USER_ROLE_UPDATE_SUCCESS,
                },
            });
        } else {
            yield put({
                type: UserActionType._USER_ROLE_UPDATE_FAILED,
                payload: {
                    backendStatus: UserActionType._USER_ROLE_UPDATE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: UserActionType._USER_ROLE_UPDATE_FAILED,
            payload: {
                backendStatus: UserActionType._USER_ROLE_UPDATE_FAILED,
                backendMsg: error.message,
            },
        });
    }
}

/**
 * getAllAdmin saga,
 */
export function* loadAllAdminSaga() {
    // debugger;
    try {
        const res = yield axios.post(getRequestUrl('auth', 'allAdmins'), {}, { withCredentials: true });
        if (res && res.data) {
            yield put({
                type: UserActionType._USER_ADMIN_UPDATE_SUCCESS,
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_UPDATE_SUCCESS,
                },
            });
        } else {
            yield put({
                type: UserActionType._USER_ADMIN_UPDATE_FAILED,
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_UPDATE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: UserActionType._USER_ADMIN_UPDATE_FAILED,
            payload: {
                backendStatus: UserActionType._USER_ADMIN_UPDATE_FAILED,
                backendMsg: error.response.statusText,
            },
        });
    }
}

/**
 * fetch all user roles for selection
 */
export function* getAllUserRoles() {
    try {
        const res = yield axios.post(getRequestUrl('auth', 'allUserRoles'), {}, { withCredentials: true });
        if (res && res.data) {
            yield put({
                type: UserActionType._USER_ADMIN_PUT_ALL_USERROLES,
                payload: {
                    allUserRoles: res.data,
                },
            });
        }
    } catch (error) {
        // console.log(error);
        yield put({
            type: UserActionType._USER_ADMIN_FETCH_ALL_USERROLES_FAILED,
            payload: {
                backendMsg: `get user roles: ${error.message}`,
                backendStatus: UserActionType._USER_ADMIN_FETCH_ALL_USERROLES_FAILED,
            },
        });
    }
}

/**
 * fetch all user roles for selection
 */
export function* getAllUserAccesses() {
    try {
        const res = yield axios.post(getRequestUrl('auth', 'allUserAccesses'), {}, { withCredentials: true });
        if (res && res.data) {
            yield put({
                type: UserActionType._USER_ROLE_PUT_ALL_USERACCESSES,
                payload: {
                    allUserAccesses: res.data,
                },
            });
        }
    } catch (error) {
        // console.log('return error');
        // console.log(error);
        yield put({
            type: UserActionType._USER_ROLE_FETCH_ALL_USERACCESSES_FAILED,
            payload: {
                backendMsg: `get user accesses: ${error.message}`,
                backendStatus: UserActionType._USER_ROLE_FETCH_ALL_USERACCESSES_FAILED,
            },
        });
    }
}

/**
 * attempt to delete user role
 */
export function* attemptDeleteUserrole(reqObj) {
    try {
        const res = yield axios.post(
            getRequestUrl('auth', 'deleteUserrole'),
            { ...reqObj.payload },
            { withCredentials: true }
        );
        // console.log(res);
        if (res && res.status === 200) {
            yield put({
                // fetch all userroles for update
                type: UserActionType._USER_ADMIN_FETCH_ALL_USERROLES,
            });
            yield put({
                type: UserActionType._USER_ADMIN_DELETE_USERROLE_SUCCEED,
            });
        }
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            yield put({
                type: UserActionType._USER_ADMIN_DELETE_USERROLE_FAILD,
                payload: {
                    backendMsg: error.response.statusText,
                    backendStatus: UserActionType._USER_ADMIN_DELETE_USERROLE_FAILD,
                },
            });
        }
    }
}
