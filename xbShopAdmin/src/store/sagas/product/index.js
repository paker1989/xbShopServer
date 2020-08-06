import { takeLatest } from 'redux-saga/effects';

import * as ProductActionType from '../../actionType/productActionType';

import { saveProductSaga } from './productSave.saga';
import { fetchProductSaga } from './productFetch.saga';

export function* loadProductSaga() {
    yield takeLatest(ProductActionType._SAVE_PRODUCT, saveProductSaga);
    yield takeLatest(ProductActionType._FETCH_PRODUCT, fetchProductSaga);
}
