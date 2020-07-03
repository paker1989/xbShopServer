import * as ProductActionType from '../actionType/productActionType';

export const submitAddProductStepOne = (formDataStepOne) => ({
    type: ProductActionType._SUBMIT_ADD_PRODUCT_STEP_ONE,
    payload: formDataStepOne,
});

export const goAddProductTargetStep = (step) => ({
    type: ProductActionType._GO_STEP_ADD_PRODUCT,
    payload: { currentStep: step },
});
