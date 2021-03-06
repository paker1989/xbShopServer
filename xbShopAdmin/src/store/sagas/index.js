import { all } from 'redux-saga/effects';
import { loadCategorySaga } from './category/category.saga';
import { loadProductSaga } from './product';
import { authSaga } from './auth';
import { userSaga } from './user';

export default function* rootSaga() {
    yield all([loadCategorySaga(), loadProductSaga(), authSaga(), userSaga()]);
}
