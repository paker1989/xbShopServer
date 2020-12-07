import axios from 'axios';
import cookie from 'react-cookies';
import { put } from 'redux-saga/effects';
import { getRequestUrl } from '../../../static/api';
import { addAddressGenerator as addressMeta } from '../../../static/data/componentMeta/user/addCustomerMeta';
import { newUpdateKey, newUpdateMaxAge } from '../../../static/data/componentMeta/user/customerListMeta';
import * as CustomerActionType from '../../actionType/customerActionType';

export function* saveCustomerSaga(reqObj) {
    const { /* action = '', */ thumbnail, ...otherProps } = reqObj.payload;
    let res;
    try {
        if (thumbnail && thumbnail[0] instanceof File) {
            const formData = new FormData();
            formData.append('thumbnail', thumbnail[0].compressed, thumbnail[0].name);
            Object.keys(otherProps).forEach((key) => {
                formData.append(key, otherProps[key]);
            });
            res = yield axios.post(getRequestUrl('customer', 'saveCustomer'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } else {
            res = yield axios.post(
                getRequestUrl('customer', 'saveCustomer'),
                {
                    ...reqObj.payload,
                },
                { withCredentials: true }
            );
        }

        // debugger;
        if (res && res.data) {
            cookie.save(newUpdateKey, res.data.customerId, { maxAge: newUpdateMaxAge });
            yield put({
                type: CustomerActionType._CUSTOMER_SAVE_SUCCESS,
                payload: {
                    backendStatus: CustomerActionType._CUSTOMER_SAVE_SUCCESS,
                    backendMsg: res.data.customerId,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._CUSTOMER_SAVE_FAILED,
                payload: {
                    backendStatus: CustomerActionType._CUSTOMER_SAVE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._CUSTOMER_SAVE_FAILED,
            payload: {
                backendStatus: CustomerActionType._CUSTOMER_SAVE_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * example: searchStr, type
 * @param {*} reqObj
 */
export function* getGeoAutocompletesSaga(reqObj) {
    const { type } = reqObj.payload;
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'getGeoAutos'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            yield put({
                type: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_SUCCESS,
                payload: {
                    type,
                    data: res.data.data,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED,
                payload: {
                    backendStatus: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED,
            payload: {
                backendStatus: CustomerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * example: searchStr, type
 * @param {*} reqObj
 */
export function* getAddressesSaga(reqObj) {
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'getAddresses'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            yield put({
                type: CustomerActionType._ADDRESS_LIST_FETCH_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._ADDRESS_LIST_FETCH_FAILED,
                payload: {
                    backendStatus: CustomerActionType._ADDRESS_LIST_FETCH_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._ADDRESS_LIST_FETCH_FAILED,
            payload: {
                backendStatus: CustomerActionType._ADDRESS_LIST_FETCH_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * example: searchStr, type
 * @param {*} reqObj
 */
export function* getCustomerSaga(reqObj) {
    const { idCustomer = -1 } = reqObj.payload;
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'getCustomer'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            yield put({
                type:
                    idCustomer !== -1
                        ? CustomerActionType._CUSTOMER_FETCH_SUCCESS
                        : CustomerActionType._CUSTOMER_FETCH_LIST_SUCCESS,
                payload: res.data,
            });
        } else {
            yield put({
                type:
                    idCustomer !== -1
                        ? CustomerActionType._CUSTOMER_FETCH_FAILED
                        : CustomerActionType._CUSTOMER_FETCH_LIST_FAILED,
                payload: {
                    backendStatus:
                        idCustomer !== -1
                            ? CustomerActionType._CUSTOMER_FETCH_FAILED
                            : CustomerActionType._CUSTOMER_FETCH_LIST_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type:
                idCustomer !== -1
                    ? CustomerActionType._CUSTOMER_FETCH_FAILED
                    : CustomerActionType._CUSTOMER_FETCH_LIST_FAILED,
            payload: {
                backendStatus:
                    idCustomer !== -1
                        ? CustomerActionType._CUSTOMER_FETCH_FAILED
                        : CustomerActionType._CUSTOMER_FETCH_LIST_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * example: searchStr, type
 * @param {*} reqObj
 */
export function* getAddressDetailSaga(reqObj) {
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'getAddresses'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            yield put({
                type: CustomerActionType._ADDRESS_FETCH_DETAIL_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._ADDRESS_FETCH_DETAIL_FAILED,
                payload: {
                    backendStatus: CustomerActionType._ADDRESS_FETCH_DETAIL_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._ADDRESS_FETCH_DETAIL_FAILED,
            payload: {
                backendStatus: CustomerActionType._ADDRESS_FETCH_DETAIL_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}

/**
 * save addresses saga,
 * @param {*} reqObj
 */
export function* saveAddressSaga(reqObj) {
    // debugger;

    const { action = 'save', customerId } = reqObj.payload;
    console.log(reqObj.payload);
    try {
        const res = yield axios.post(
            getRequestUrl('customer', 'saveAddress'),
            {
                ...reqObj.payload,
            },
            { withCredentials: true }
        );
        if (res && res.data) {
            if (action !== 'delete') {
                cookie.save(addressMeta.newUpdateKey, res.data.idAddress, { maxAge: addressMeta.newUpdateMaxAge });
            }
            yield put({
                type: CustomerActionType._ADDRESS_LIST_FETCH,
                payload: {
                    customerId, // force to re-fetch
                },
            });

            yield put({
                type: CustomerActionType._ADDRESS_SAVE_SUCCESS,
                payload: {
                    backendStatus: CustomerActionType._ADDRESS_SAVE_SUCCESS,
                },
            });
        } else {
            yield put({
                type: CustomerActionType._ADDRESS_SAVE_FAILED,
                payload: {
                    backendStatus: CustomerActionType._ADDRESS_SAVE_FAILED,
                    backendMsg: res.statusText,
                },
            });
        }
    } catch (error) {
        yield put({
            type: CustomerActionType._ADDRESS_SAVE_FAILED,
            payload: {
                backendStatus: CustomerActionType._ADDRESS_SAVE_FAILED,
                backendMsg: error.response ? error.response.statusText : error.message,
            },
        });
    }
}
