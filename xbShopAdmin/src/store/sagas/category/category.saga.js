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
        const { categoryName, isActive, isDeleted = 0, idCategory = -2 } = reqObj.payload;

        const res = yield axios.post(getRequestUrl('category', 'update'), {
            categoryName,
            isActive,
            isDeleted,
            idCategory,
        });
        console.log(res);
        if (res && res.data.statusCode === 200) {
            console.log('succeed');
            yield put({
                type: CategoryActionType._EDIT_CATEGORY_SUCCESS,
            });
        } else {
            yield put({
                type: CategoryActionType._EDIT_CATEGORY_FAIL,
                payload: {
                    errorMsg: res.data.msg,
                },
            });
        }
    } catch (error) {
        console.log('error');
        console.log(res.data.msg);
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
    yield takeEvery(CategoryActionType._UPDATE_CATEGORIES, updateCategorySaga);
}
