import axios from 'axios';
import { put } from 'redux-saga/effects';
// import cookie from 'react-cookies';

// import config from '../../../static/data/componentMeta/auth/authMeta';
import * as UserActionType from '../../actionType/userActionType';
import { getRequestUrl } from '../../../static/api';

// const { authedKey, userSessionMaxAge } = config;

/**
 * updateAdmin saga,
 * @param {*} reqObj
 */
export function* updateAdminSaga(reqObj) {
    // debugger;
    try {
        const res = yield axios.post(getRequestUrl('auth', 'updateAdmin'), {
            ...reqObj.payload,
        });
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
        const res = yield axios.post(getRequestUrl('auth', 'allAdmins'));
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
