import axios from 'axios';
import cookie from 'react-cookies';
import { put } from 'redux-saga/effects';
import { getRequestUrl } from '../../../static/api';
import { adminGenerator } from '../../../static/data/componentMeta/user/addAdminMeta';
import { roleGenerator } from '../../../static/data/componentMeta/user/addRoleMeta';
import * as UserActionType from '../../actionType/userActionType';

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
    const { action = '' } = reqObj.payload;
    try {
        const res = yield axios.post(
            getRequestUrl('auth', 'updateAdmin'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            if (action !== 'destroy') {
                cookie.save(adminGenerator.newUpdateKey, res.data.idUser, { maxAge: adminGenerator.newUpdateMaxAge });
            }
            yield put({
                // fetch all admins for update
                type: UserActionType._USER_ADMIN_FETCH_ALL,
            });
            yield put({
                type: UserActionType._USER_ADMIN_UPDATE_SUCCESS,
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_UPDATE_SUCCESS,
                    backendMsg: action,
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
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * updateRole saga,
 * @param {*} reqObj
 */
export function* updateRoleSaga(reqObj) {
    // console.log(reqObj);
    // return;
    try {
        const res = yield axios.post(
            getRequestUrl('auth', 'updateRole'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            cookie.save(roleGenerator.newUpdateKey, res.data.idRole, { maxAge: roleGenerator.newUpdateMaxAge });
            yield put({
                // fetch all userroles for update
                type: UserActionType._USER_ADMIN_FETCH_ALL_USERROLES,
            });
            yield put({
                // fetch all admins in case of related
                type: UserActionType._USER_ADMIN_FETCH_ALL,
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
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * getAllAdmin saga,
 */
export function* getAllAdminSaga() {
    // debugger;
    try {
        const res = yield axios.post(getRequestUrl('auth', 'allAdmins'), {}, { withCredentials: true });
        if (res && res.data) {
            yield put({
                type: UserActionType._USER_ADMIN_FETCH_ALL_SUCCESS,
                payload: {
                    allAdmins: res.data,
                },
            });
        } else {
            yield put({
                type: UserActionType._USER_ADMIN_FETCH_ALL_FAILED,
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_FETCH_ALL_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: UserActionType._USER_ADMIN_FETCH_ALL_FAILED,
            payload: {
                backendStatus: UserActionType._USER_ADMIN_FETCH_ALL_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
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
                payload: {
                    backendStatus: UserActionType._USER_ADMIN_DELETE_USERROLE_SUCCEED,
                },
            });
        }
    } catch (error) {
        // console.log(error.response);
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
