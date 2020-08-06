import { put, select } from 'redux-saga/effects';
import axios from 'axios';

import * as ProductActionType from '../../actionType/productActionType';
import { setObjectArray } from '../../../utils/data.helper';
import { getRequestUrl } from '../../../static/api';

export function* fetchProductSaga(reqObj) {
    // const { isOffShelf, comment, detailDscp } = reqObj.payload;
    console.log(reqObj.payload);

    try {
        const res = yield axios.post(getRequestUrl('product', 'fetchList'), { ...reqObj.payload });
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
