import { put, select } from 'redux-saga/effects';
import axios from 'axios';

import * as ProductActionType from '../../actionType/productActionType';
import { setObjectArray } from '../../../utils/data.helper';
import { getRequestUrl } from '../../../static/api';

export function* saveProductSaga(reqObj) {
    // try {
    // const { categoryName = '', isActive = 1, isDeleted = 0, idCategory = -1 } = reqObj.payload;
    const stepOneFormData = yield select((state) => state.product.addProductReducer);

    const { isOffShelf, comment, detailDscp } = reqObj.payload;
    const { idProduct, categories, productName, shortDscp, specs, galleries } = stepOneFormData;

    const formData = new FormData();

    formData.set('idProduct', idProduct);
    formData.set('categories', categories);
    formData.set('productName', productName);
    formData.set('shortDscp', shortDscp);
    formData.set('isOffShelf', isOffShelf ? 0 : 1);
    formData.set('comment', comment);
    formData.set('detailDscp', detailDscp);
    /* eslint-disable */
    formData.set(
        'totalStock',
        specs.reduce((sum, cur) => (sum += cur.stockNumber), 0)
    );
    /* eslint-enable */
    setObjectArray(formData, 'specs', specs);
    galleries.forEach((gallery) => formData.append('galleries', gallery.compressed, gallery.name));

    try {
        const res = yield axios.post(getRequestUrl('product', 'save'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // console.log(res);
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

/**
 * bulk action on product. supported action: delete, off shelf
 * @param {*} reqObj
 */
export function* bulkUpdateProductSaga(reqObj) {
    try {
        const res = yield axios.post(getRequestUrl('product', 'bulkUpdate'), { ...reqObj.payload });
        // console.log(res);
        if (res && res.status === 200) {
            const { products, totalCnt } = res.data;
            yield put({
                type: ProductActionType._BULK_UPDATE_SUCCESS,
                payload: {
                    // fetchedProducts: products,
                    // totalCnt,
                },
            });
        } else {
            yield put({
                type: ProductActionType._BULK_UPDATE_FAIL,
                payload: {
                    errorMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionType._BULK_UPDATE_FAIL,
            payload: {
                errorMsg: error.message,
            },
        });
    }
}
