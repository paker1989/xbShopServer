import * as ProductActionType from '../actionType/productActionType';

export const submitAddProductStep = (formDataStep) => ({
    type: ProductActionType._SUBMIT_ADD_PRODUCT_STEP,
    payload: formDataStep,
});

export const reEditeProductSpec = () => ({
    type: ProductActionType._REEDIT_PRODUCT,
    payload: { currentStep: 0 },
});

export const saveEditedProduct = (rawFormData) => ({
    type: ProductActionType._SAVE_PRODUCT,
    payload: rawFormData,
});

export const resetBackendStatus = () => ({
    type: ProductActionType._RESET_ADD_PRODUCT_STATE,
    payload: {
        backendStatus: '',
        backendMsg: '',
    },
});

export const resetAddProduct = () => ({
    type: ProductActionType._RESET_ADD_PRODUCT_STATE,
    payload: {
        currentStep: 0,
        idProduct: -1,
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

export const fetchProductList = (params) => ({
    type: ProductActionType._FETCH_PRODUCT,
    payload: params,
});
