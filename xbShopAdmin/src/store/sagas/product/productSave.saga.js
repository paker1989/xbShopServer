import { put, select } from 'redux-saga/effects';
import axios from 'axios';

import { setObjectArray } from '../../../utils/data.helper';
import * as ProductActionType from '../../actionType/productActionType';
import { getRequestUrl } from '../../../static/api';

export function* saveProductSaga(reqObj) {
    // try {
    // const { categoryName = '', isActive = 1, isDeleted = 0, idCategory = -1 } = reqObj.payload;
    const stepOneFormData = yield select((state) => state.product.addProductReducer);

    const { isOffShelf, comment, detailDscp } = reqObj.payload;
    const { categories, productName, shortDscp, specs, galleries } = stepOneFormData;

    const formData = new FormData();

    formData.set('categories', categories);
    formData.set('productName', productName);
    formData.set('shortDscp', shortDscp);
    setObjectArray(formData, 'specs', specs);
    // formData.set(
    //     'galleries',
    //     galleries.map((gallery) => ({ file: gallery.compressed, name: gallery.name }))
    // );
    galleries.forEach((gallery) => formData.append('galleries', gallery.compressed, gallery.name));
    formData.set('isOffShelf', isOffShelf ? 0 : 1);
    formData.set('comment', comment);
    formData.set('detailDscp', detailDscp);

    console.log(galleries.map((gallery) => ({ file: gallery.compressed, name: gallery.name })));
    console.log(formData.get('galleries'));
    formData.append('gallery_', 'test');

    try {
        const res = yield axios.post(getRequestUrl('product', 'save'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(res);

        // if (res && res.data.statusCode === 200) {
        //     yield put({
        //         type: CategoryActionType._EDIT_CATEGORY_SUCCESS,
        //     });
        // } else {
        //     yield put({
        //         type: CategoryActionType._EDIT_CATEGORY_FAIL,
        //         payload: {
        //             errorMsg: res.data.msg,
        //         },
        //     });
        // }
    } catch (error) {
        console.log(error);
        // yield put({
        //     type: CategoryActionType._EDIT_CATEGORY_FAIL,
        //     payload: {
        //         errorMsg: error.message,
        //     },
        // });
    }
}
