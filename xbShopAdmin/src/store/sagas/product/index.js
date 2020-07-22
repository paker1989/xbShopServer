import { takeLatest } from 'redux-saga/effects';

import * as ProductActionType from '../../actionType/productActionType';

import { saveProductSaga } from './productSave.saga';

export function* loadProductSaga() {
    yield takeLatest(ProductActionType._SAVE_PRODUCT, saveProductSaga);
}
