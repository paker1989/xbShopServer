import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as CategoryActionType from '../../actionType/categoryActionType';
import { getRequestUrl } from '../../../static/api';

function* getCategoriesSaga(reqObj) {
    try {
        const res = yield axios.get(getRequestUrl('category', 'getCategories'), {
            params: { ...reqObj },
        });

        if (res && res.data) {
            yield put({
                type: CategoryActionType._PUT_CATEGORIES,
                payload: {
                    categories: res.data.data.res,
                    isInited: true,
                },
            });
        }
    } catch (error) {
        // console.log(error);
    }
}

function* updateCategorySaga(reqObj) {
    try {
        console.log('updateCategorySaga');
        console.log(reqObj);
        const { categoryName, isActive } = reqObj.payload;
        const res = yield axios.post(getRequestUrl('category', 'update'), {
            params: { categoryName, isActive },
        });

        if (res && res.data) {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
}

export function* loadCategorySaga() {
    yield takeLatest(CategoryActionType._GET_CATEGORIES, getCategoriesSaga);
    yield takeEvery(CategoryActionType._UPDATE_CATEGORIES, updateCategorySaga);
}
