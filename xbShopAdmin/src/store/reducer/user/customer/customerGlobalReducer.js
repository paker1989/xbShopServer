/**
 * add customer form
 */
import * as customerActionType from '../../../actionType/customerActionType';

const initialState = {
    countryList: [],
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    // debugger;
    const { type, data, backendMsg, backendStatus } = action.payload || {};
    switch (action.type) {
        case customerActionType._CUSTOMER__GLOBAL_RESET:
            return { ...state, backendStatus: '', backendMsg: '' };
        case customerActionType._GLOBAL_FETCH_CONSTANT_SUCCEED:
            switch (type) {
                case 'country':
                    return { ...state, backendMsg, backendStatus, countryList: data };
                default:
                    return state;
            }
        case customerActionType._GLOBAL_FETCH_CONSTANT_FAILED:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};