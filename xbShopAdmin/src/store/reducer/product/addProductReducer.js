/**
 * add product form
 */
import * as ProductActionType from '../../actionType/productActionType';

const initialState = {
    currentStep: 0,
    productName: '',
    shortDscp: '',
    categories: [],
    isOffShelf: false, // 是否暂时下架
    galleries: [],
    specs: [],
    comment: '',
    detailDscp: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ProductActionType._SUBMIT_ADD_PRODUCT_STEP:
            return { ...state, ...action.payload };
        case ProductActionType._GO_STEP_ADD_PRODUCT:
            return { ...state, ...action.payload };
        case ProductActionType._UPDATE_SPEC_ADD_PRODUCT:
            return { ...state, ...action.payload };
        case ProductActionType._REEDIT_PRODUCT:
            return { ...state, ...action.payload };
        case ProductActionType._RESET_ADD_PRODUCT_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
