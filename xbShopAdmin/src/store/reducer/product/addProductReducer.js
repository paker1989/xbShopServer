/**
 * add product form
 */
import * as ProductActionType from '../../actionType/productActionType';

const initialState = {
    currentStep: 0,
    productName: '',
    shortDscp: '',
    category: [],
    isOffShelf: true, // 是否暂时下架
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ProductActionType._SUBMIT_ADD_PRODUCT_STEP_ONE:
            console.log(action.payload);
            return { ...state, currentStep: 1, ...action.payload };
        case ProductActionType._GO_STEP_ADD_PRODUCT:
            console.log(state);
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
