/**
 * add customer form
 */
import * as customerActionType from '../../../actionType/customerActionType';

const initialState = {
    countryList: [],
    backendStatus: '',
    backendMsg: '',
    addresses: [],
};

export default (state = initialState, action) => {
    const { type, data, backendMsg, backendStatus } = action.payload || {};
    switch (action.type) {
        case customerActionType._ADDRESS_LIST_FETCH_SUCCESS:
            return { ...state, addresses: action.payload.data };
        case customerActionType._ADDRESS_LIST_FETCH_FAILED:
            return { ...state, ...action.payload };
        case customerActionType._CUSTOMER__GLOBAL_RESET_BACKENDSTATUS:
            return { ...state, backendStatus: '', backendMsg: '' };
        case customerActionType._CUSTOMER__GLOBAL_RESET:
            return { ...state, backendStatus: '', backendMsg: '', addresses: [] };
        case customerActionType._GLOBAL_FETCH_CONSTANT_SUCCEED:
            switch (type) {
                case 'country':
                    return { ...state, backendMsg, backendStatus, countryList: data };
                default:
                    return state;
            }
        case customerActionType._GLOBAL_FETCH_CONSTANT_FAILED:
            return { ...state, ...action.payload };
        case customerActionType._ADDRESS_RESET_LIST_ADDRESS:
            return { ...state, addresses: [] };
        default:
            return state;
    }
};
