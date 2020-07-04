/**
 * add product form
 */
import * as CategoryActionType from '../../actionType/categoryActionType';

const initialState = {
    isInited: false,
    categories: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CategoryActionType._UPDATE_CATEGORIES:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
