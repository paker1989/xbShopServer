import axios from 'axios';
import { put } from 'redux-saga/effects';
import cookie from 'react-cookies';

import config from '../../../static/data/componentMeta/auth/authMeta';
import * as AuthActionType from '../../actionType/authActionType';
import { getRequestUrl } from '../../../static/api';

/**
 * login saga,
 * expect return either { authUser } or res.statusText
 * @param {*} reqObj
 */
export function* loginSaga(reqObj) {
    const { authedKey, userSessionMaxAge } = config;
    try {
        const { loginType = 'login' } = reqObj.payload; // login or autoLogin

        const res = yield axios.post(
            getRequestUrl('auth', loginType),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        // console.log(res);
        if (res && res.data) {
            cookie.save(authedKey, res.data, {
                // set user in cookie
                maxAge: userSessionMaxAge,
            });
            yield put({
                type: AuthActionType._AUTH_LOGIN_SUCCESS,
                payload: {
                    backendStatus: AuthActionType._AUTH_LOGIN_SUCCESS,
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
