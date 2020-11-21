import axios from 'axios';
// import cookie from 'react-cookies';
import { put } from 'redux-saga/effects';
import { getRequestUrl } from '../../../static/api';
import * as CustomerActionType from '../../actionType/customerActionType';

export function* getConstantsSaga(reqObj) {
    const { type } = reqObj.payload;
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'fetchConstants'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            yield put({
                type: CustomerActionType._GLOBAL_FETCH_CONSTANT_SUCCEED,
                payload: {
                    // backendStatus: CustomerActionType._GLOBAL_FETCH_CONSTANT_SUCCEED,
                    type,
                    data: res.data,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._GLOBAL_FETCH_CONSTANT_FAILED,
                payload: {
                    backendStatus: CustomerActionType._GLOBAL_FETCH_CONSTANT_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._GLOBAL_FETCH_CONSTANT_FAILED,
            payload: {
                backendStatus: CustomerActionType._GLOBAL_FETCH_CONSTANT_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}
