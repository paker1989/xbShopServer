import axios from 'axios';
// import cookie from 'react-cookies';
import { put } from 'redux-saga/effects';
import { getRequestUrl } from '../../../static/api';
import * as CustomerActionType from '../../actionType/customerActionType';

export function* saveCustomerSaga(reqObj) {
    debugger;
    const { action = '', thumbnail, ...otherProps } = reqObj.payload;
    const formData = new FormData();
    formData.append('thumbnail', thumbnail[0].compressed, thumbnail[0].name);
    Object.keys(otherProps).forEach((key) => {
        formData.append(key, otherProps[key]);
    });
    try {
        // const res = yield axios.post(
        //     getRequestUrl('customer', 'saveCustomer'),
        //     {
        //         ...reqObj.payload,
        //     },
        //     { withCredentials: true }
        // );
        const res = yield axios.post(getRequestUrl('customer', 'saveCustomer'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (res && res.data) {
            yield put({
                type: CustomerActionType._CUSTOMER_SAVE_SUCCESS,
                payload: {
                    backendStatus: CustomerActionType._CUSTOMER_SAVE_SUCCESS,
                    backendMsg: action,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._CUSTOMER_SAVE_FAILED,
                payload: {
                    backendStatus: CustomerActionType._CUSTOMER_SAVE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._CUSTOMER_SAVE_FAILED,
            payload: {
                backendStatus: CustomerActionType._CUSTOMER_SAVE_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}
