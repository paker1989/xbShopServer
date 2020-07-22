import { all } from 'redux-saga/effects';
import { loadCategorySaga } from './category/category.saga';
import { loadProductSaga } from './product';

export default function* rootSaga() {
    yield all([loadCategorySaga(), loadProductSaga()]);
}
