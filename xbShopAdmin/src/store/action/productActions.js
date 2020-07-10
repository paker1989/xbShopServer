import * as ProductActionType from '../actionType/productActionType';

export const submitAddProductStep = (formDataStep) => ({
    type: ProductActionType._SUBMIT_ADD_PRODUCT_STEP,
    payload: formDataStep,
});

export const goAddProductTargetStep = (step) => ({
    type: ProductActionType._GO_STEP_ADD_PRODUCT,
    payload: { currentStep: step },
});

export const updateAddProductSpec = (specs) => ({
    type: ProductActionType._UPDATE_SPEC_ADD_PRODUCT,
    payload: { specs },
});

export const reediteProductSpec = () => ({
    type: ProductActionType._REEDIT_PRODUCT,
    payload: { currentStep: 0 },
});

export const resetAddProduct = () => ({
    type: ProductActionType._RESET_ADD_PRODUCT_STATE,
    payload: {
        currentStep: 0,
        productName: '',
        shortDscp: '',
        categories: [],
        isOffShelf: false,
        galleries: [],
        specs: [],
        comment: '',
        detailDscp: '',
    },
});
