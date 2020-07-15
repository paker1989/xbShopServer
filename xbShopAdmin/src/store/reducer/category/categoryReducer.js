/**
 * add product form
 */
import * as CategoryActionType from '../../actionType/categoryActionType';

const initialState = {
    isInited: false,
    categories: [],
    editionStatus: {
        name: '',
        isActive: true,
        parentId: -1, // 保留字段
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CategoryActionType._PUT_CATEGORIES:
            return { ...state, ...action.payload };
        case CategoryActionType._CANCEL_EDIT_CATEGORY:
            return { ...state, editionStatus: { ...action.payload } };
        default:
            return state;
    }
};
