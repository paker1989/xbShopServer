import { takeLatest } from 'redux-saga/effects';

import * as ProductActionType from '../../actionType/productActionType';

import { fetchProductSaga } from './productFetch.saga';
import { saveProductSaga, bulkUpdateProductSaga } from './productSave.saga';

export function* loadProductSaga() {
    yield takeLatest(ProductActionType._SAVE_PRODUCT, saveProductSaga);
    yield takeLatest(ProductActionType._FETCH_PRODUCT, fetchProductSaga);
    yield takeLatest(ProductActionType._BULK_UPDATE_PRODUCT, bulkUpdateProductSaga);
}
