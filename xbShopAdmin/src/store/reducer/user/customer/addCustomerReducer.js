/**
 * add customer form
 */
import * as customerActionType from '../../../actionType/customerActionType';

const formInitialState = {
    phone: '',
    pseudo: '',
    email: '',
    gender: 'm', // m or f
    thumbnail: '',
    isActive: true,
    password: '',
    passwordRepeat: '',
};

const initialState = {
    ...formInitialState,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case customerActionType._CUSTOMER_SAVE_SUCCESS:
        case customerActionType._CUSTOMER_SAVE_FAILED:
            return { ...state, ...action.payload };
        case customerActionType._CUSTOMER_SAVE_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
