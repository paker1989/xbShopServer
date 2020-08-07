/**
 * add product form
 */
import * as ProductActionType from '../../actionType/productActionType';

const initialState = {
    // stockCreteria: '-1',
    // soldCreteria: '-1',
    selectedProducts: [],
    fetchedProducts: [],
    totalCnt: 0,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ProductActionType._FETCH_PRODUCT_SUCCESS:
            return { ...state, ...action.payload };
        case ProductActionType._FETCH_PRODUCT_FAIL:
            return {
                ...state,
                backendMsg: action.payload.errorMsg,
                backendStatus: ProductActionType._FETCH_PRODUCT_FAIL,
            };
        case ProductActionType._RESET_LIST_BACKEND_STATUS:
            return { ...state, backendMsg: '', backendStatus: '' };
        default:
            return state;
    }
};
