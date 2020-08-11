/**
 * add product form
 */
import * as ProductActionType from '../../actionType/productActionType';

const initialState = {
    sortedCretia: 'NA',
    sortedOrder: 'NA',
    startPage: 1,
    currentPage: 1,
    filter: 'all',
    selectedProducts: [],
    fetchedProducts: [],
    totalCnt: 0,
    backendStatus: '',
    backendMsg: '',
    bulkAction: 'select',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ProductActionType._FETCH_PRODUCT_SUCCESS:
            return { ...state, ...action.payload, backendStatus: ProductActionType._FETCH_PRODUCT_SUCCESS };
        case ProductActionType._BULK_UPDATE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                backendStatus: ProductActionType._BULK_UPDATE_SUCCESS,
                selectedProducts: [],
            };
        case ProductActionType._FETCH_PRODUCT_FAIL:
            return {
                ...state,
                backendStatus: ProductActionType._FETCH_PRODUCT_FAIL,
                backendMsg: action.payload.errorMsg,
            };
        case ProductActionType._BULK_UPDATE_FAIL:
            return {
                ...state,
                backendStatus: ProductActionType._BULK_UPDATE_FAIL,
                backendMsg: action.payload.errorMsg,
                selectedProducts: [],
            };
        case ProductActionType._RESET_LIST_BACKEND_STATUS:
            return { ...state, backendMsg: '', backendStatus: '' };
        case ProductActionType._LIST_SELECT_KEYS:
            return { ...state, ...action.payload };
        case ProductActionType._PAGINATION_UPDATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
