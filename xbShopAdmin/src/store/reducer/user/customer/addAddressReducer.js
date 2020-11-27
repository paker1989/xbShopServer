/**
 * add customer form
 */
import * as customerActionType from '../../../actionType/customerActionType';

const formInitialState = {
    addr1: '',
    addr2: '',
    postCode: '',
    city: '',
    region: '',
    countryCode: 'fr',
    instruction: '',
};

const initialState = {
    ...formInitialState,
    regionAvailables: [],
    cityAvailables: [],
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    const { type, data } = action.payload || {};
    switch (action.type) {
        case customerActionType._ADDRESS_SAVE_RESET_BACKEND_STATUS:
            return { ...state, ...action.payload };
        // case customerActionType._ADDRESS_LIST_FETCH_SUCCESS:
        //     return { ...state, addresses: action.payload.data };
        case customerActionType._ADDRESS_RESET_STATE:
            return { ...initialState };
        case customerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_SUCCESS:
            switch (type) {
                case 'region':
                    return { ...state, regionAvailables: data };
                case 'city':
                    return { ...state, cityAvailables: data };
                default:
                    return { ...state };
            }
        case customerActionType._ADDRESS_FETCH_GEO_AUTOCOMPLETE_FAILED:
            return { ...state, ...action.payload };
        case customerActionType._ADDRESS_SAVE_FAILED:
        case customerActionType._ADDRESS_SAVE_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
