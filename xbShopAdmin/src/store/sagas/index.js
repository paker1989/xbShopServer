import { all } from 'redux-saga/effects';
import { loadCategorySaga } from './category/category.saga';

export default function* rootSaga() {
    yield all([loadCategorySaga()]);
}
