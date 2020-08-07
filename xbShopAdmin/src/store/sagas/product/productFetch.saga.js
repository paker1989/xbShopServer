import { put, select } from 'redux-saga/effects';
import axios from 'axios';

import * as ProductActionType from '../../actionType/productActionType';
import { getRequestUrl } from '../../../static/api';

export function* fetchProductSaga(reqObj) {
    try {
        const res = yield axios.post(getRequestUrl('product', 'fetchList'), { ...reqObj.payload });
        // const res = yield axios.get(getRequestUrl('product', 'fetchList'), { ...reqObj.payload });
        console.log(res);
        if (res && res.status === 200) {
            yield put({
                type: ProductActionType._EDIT_PRODUCT_SUCCESS,
            });
        } else {
            yield put({
                type: ProductActionType._EDIT_PRODUCT_FAIL,
                payload: {
                    errorMsg: res.data,
                },
            });
        }
    } catch (error) {
        // console.log(error);
        yield put({
            type: ProductActionType._EDIT_PRODUCT_FAIL,
            payload: {
                errorMsg: error.message,
            },
        });
    }
}
