import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as AuthActionType from '../../actionType/authActionType';
import { getRequestUrl } from '../../../static/api';

/**
 * login saga,
 * expect return either { authUser } or res.statusText
 * @param {*} reqObj
 */
export function* loginSaga(reqObj) {
    try {
        const { loginType = 'login' } = reqObj.payload; // login or autoLogin
        // console.log(reqObj);
        const res = yield axios.post(getRequestUrl('auth', loginType), {
            ...reqObj.payload,
        });

        if (res && res.data) {
            yield put({
                type: AuthActionType._AUTH_LOGIN_SUCCESS,
                payload: {
                    backendStatus: AuthActionType._AUTH_LOGIN_SUCCESS,
                    authUser: res.data.authUser,
                },
            });
        } else {
            yield put({
                type: AuthActionType._AUTH_LOGIN_FAIL,
                payload: {
                    backendStatus: AuthActionType._AUTH_LOGIN_FAIL,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: AuthActionType._AUTH_LOGIN_FAIL,
            payload: {
                backendStatus: AuthActionType._AUTH_LOGIN_FAIL,
                backendMsg: error.message,
            },
        });
    }
}
