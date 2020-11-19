/**
 * add customer form
 */
import * as customerActionType from '../../../actionType/customerActionType';

const initialState = {
    // selectMenu: 'basic',
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case customerActionType._SET_SELECT_MENU:
        //     return { ...state, selectMenu: action.payload };
        case customerActionType._CUSTOMER__GLOBAL_RESET:
            return { ...state, ...initialState };
        default:
            return state;
    }
};
