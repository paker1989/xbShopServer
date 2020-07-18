/**
 * add product form
 */
import * as CategoryActionType from '../../actionType/categoryActionType';

const initialState = {
    isInited: false,
    categories: [],
    editionFields: {
        idCategory: -1,
        label: '',
        isActive: true,
        parentId: -1, // 保留字段
        isDeleted: false,
    },
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CategoryActionType._PUT_CATEGORIES:
            return { ...state, ...action.payload };
        case CategoryActionType._CANCEL_EDIT_CATEGORY:
            return { ...state, editionFields: { ...action.payload }, backendStatus: '', backendMsg: '' };
        case CategoryActionType._EDIT_CATEGORY_SUCCESS:
            return { ...state, isInited: false, backendStatus: CategoryActionType._EDIT_CATEGORY_SUCCESS };
        case CategoryActionType._EDIT_CATEGORY_FAIL:
            return {
                ...state,
                backendStatus: CategoryActionType._EDIT_CATEGORY_FAIL,
                backendMsg: action.payload.errorMsg,
            };
        case CategoryActionType._RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        case CategoryActionType._EDIT_CATEGORY:
            /* eslint-disable */
            const { idCat } = action.payload;
            const toEdit = state.categories.find((item) => item.idCategory === idCat);
            /* eslint-enable */
            if (toEdit) {
                return { ...state, editionFields: { ...toEdit } };
            }
            return state;
        default:
            return state;
    }
};
