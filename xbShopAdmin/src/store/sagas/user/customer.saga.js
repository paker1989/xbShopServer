import axios from 'axios';
// import cookie from 'react-cookies';
import { put } from 'redux-saga/effects';
import { getRequestUrl } from '../../../static/api';
import * as CustomerActionType from '../../actionType/customerActionType';

export function* saveCustomerSaga(reqObj) {
    // debugger;
    const { action = '' } = reqObj.payload;
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'saveCustomer'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            // if (action !== 'destroy') {
            //     cookie.save(adminGenerator.newUpdateKey, res.data.idUser, { maxAge: adminGenerator.newUpdateMaxAge });
            // }
            // yield put({
            //     // fetch all admins for update
            //     type: CustomerActionType._USER_ADMIN_FETCH_ALL,
            // });
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
