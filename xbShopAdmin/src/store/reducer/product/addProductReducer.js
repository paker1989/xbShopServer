/**
 * add product form
 */
import * as ProductActionType from '../../actionType/productActionType';

const initialState = {
    currentStep: 0,
    idProduct: -1,
    productName: '',
    shortDscp: '',
    categories: [],
    isOffShelf: false, // 是否暂时下架
    galleries: [],
    specs: [],
    comment: '',
    detailDscp: '',
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ProductActionType._SUBMIT_ADD_PRODUCT_STEP:
            return { ...state, ...action.payload };
        case ProductActionType._REEDIT_PRODUCT:
            return { ...state, ...action.payload };
        case ProductActionType._RESET_ADD_PRODUCT_STATE:
            return { ...state, ...action.payload };
        case ProductActionType._EDIT_PRODUCT_SUCCESS:
            return { ...state, currentStep: 2 };
        case ProductActionType._EDIT_PRODUCT_FAIL:
            return {
                ...state,
                backendStatus: ProductActionType._EDIT_PRODUCT_FAIL,
                backendMsg: action.payload.errorMsg,
            };
        default:
            return state;
    }
};
