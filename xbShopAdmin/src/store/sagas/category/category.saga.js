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
                    categories: res.data.res,
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
        const { categoryName = '', isActive = 1, isDeleted = 0, idCategory = -1 } = reqObj.payload;

        const res = yield axios.post(getRequestUrl('category', 'update'), {
            categoryName,
            isActive,
            isDeleted,
            idCategory,
        });
        if (res && res.status === 200) {
            yield put({
                type: CategoryActionType._EDIT_CATEGORY_SUCCESS,
            });
        } else {
            yield put({
                type: CategoryActionType._EDIT_CATEGORY_FAIL,
                payload: {
                    errorMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionType._EDIT_CATEGORY_FAIL,
            payload: {
                errorMsg: error.message,
            },
        });
    }
}

export function* loadCategorySaga() {
    yield takeLatest(CategoryActionType._GET_CATEGORIES, getCategoriesSaga);
    yield takeEvery(CategoryActionType._UPDATE_CATEGORY, updateCategorySaga);
}
