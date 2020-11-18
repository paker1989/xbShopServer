/**
 * add customer form
 */
import * as customerActionType from '../../../actionType/customerActionType';

const formInitialState = {
    addressId: -1,
};

const initialState = {
    ...formInitialState,
    editMode: false,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case customerActionType._ADDRESS_SAVE_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        case customerActionType._ADDRESS_SET_EDIT_MODE:
            return { ...state, ...action.payload };
        case customerActionType._ADDRESS_RESET_STATE:
            return { ...initialState };
        default:
            return state;
    }
};
