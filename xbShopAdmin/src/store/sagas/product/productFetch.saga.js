import { put, select } from 'redux-saga/effects';
import axios from 'axios';

import * as ProductActionType from '../../actionType/productActionType';
import { getCurrentPage } from '../../../utils/data.helper';

import { getRequestUrl } from '../../../static/api';

import { nbPageFetched, pageSize } from '../../../static/data/componentMeta/product/productListMeta';

export function* fetchProductSaga(reqObj) {
    try {
        const { currentPage, filter, startPage, sortedCretia, sortedOrder } = yield select(
            (state) => state.product.productListReducer
        );
        // const store = yield select((state) => state.product.productListReducer);
        // console.log(store);
        const res = yield axios.post(getRequestUrl('product', 'fetchList'), {
            filter,
            limit: nbPageFetched * pageSize,
            pageSize,
            startPage,
            sortedCretia,
            sortedOrder,
            ...reqObj.payload,
        });

        // console.log(res);
        if (res && res.status === 200) {
            const { products, totalCnt } = res.data;
            const _startPage = res.data.startPage;

            yield put({
                type: ProductActionType._FETCH_PRODUCT_SUCCESS,
                payload: {
                    fetchedProducts: products,
                    totalCnt,
                    startPage: _startPage,
                    currentPage: getCurrentPage(currentPage, _startPage, products.length),
                },
            });
        } else {
            yield put({
                type: ProductActionType._FETCH_PRODUCT_FAIL,
                payload: {
                    errorMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionType._FETCH_PRODUCT_FAIL,
            payload: {
                errorMsg: error.message,
            },
        });
    }
}
