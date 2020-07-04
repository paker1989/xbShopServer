import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as CategoryActionType from '../../actionType/categoryActionType';
import { getRequestUrl } from '../../../static/api';

function* getCategoriesSaga(reqObj) {
    console.log('getCategoriesSaga');
    try {
        const res = yield axios.get(getRequestUrl('getCategories'), {
            params: { ...reqObj },
        });
        console.log(res);

        if (res && res.data) {
            yield put({
                type: CategoryActionType._UPDATE_CATEGORIES,
                payload: {
                    categories: res.data,
                    isInited: true,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* loadCategorySaga() {
    yield takeLatest(CategoryActionType._GET_CATEGORIES, getCategoriesSaga);
}
