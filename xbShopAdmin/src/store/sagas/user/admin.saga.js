import axios from 'axios';
import { put } from 'redux-saga/effects';
// import cookie from 'react-cookies';

// import config from '../../../static/data/componentMeta/auth/authMeta';
import * as UserActionType from '../../actionType/userActionType';
import { getRequestUrl } from '../../../static/api';

// const { authedKey, userSessionMaxAge } = config;

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
                backendMsg: error.message,
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
        console.log(error);
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
        console.log(res);
        // if (res && res.data) {
        //     yield put({
        //         type: UserActionType._USER_ADMIN_PUT_ALL_USERROLES,
        //         payload: {
        //             allUserRoles: res.data,
        //         },
        //     });
        // }
    } catch (error) {
        // console.log(error);
        console.log(error.response);
    }
}
