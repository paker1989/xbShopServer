/**
 * add product form
 */
import * as CategoryActionType from '../../actionType/categoryActionType';

const initialState = {
    isInited: false,
    categories: [],
    editionFields: {
        name: '',
        isActive: true,
        parentId: -1, // 保留字段
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
        default:
            return state;
    }
};
