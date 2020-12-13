/**
 * add product form
 */
import * as CustomerActionType from '../../../actionType/customerActionType';

const initialState = {
    sortedCretia: 'NA',
    sortedOrder: 'NA',
    startPage: 1,
    searchStr: '',
    currentPage: 1,
    filter: [],
    selectedCustomers: [],
    fetchedCustomers: [],
    totalCnt: 0,
    bulkAction: 'select',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CustomerActionType._CUSTOMER_FETCH_LIST_SUCCESS:
            // debugger;
            /* eslint-disable */
            const { data, totalCnt, startPage } = action.payload;
            /* eslint-disable */
            return {
                ...state,
                fetchedCustomers: [...data],
                totalCnt,
                startPage,
                backendStatus: CustomerActionType._CUSTOMER_FETCH_LIST_SUCCESS,
            };
        case CustomerActionType._CUSTOMER_FETCH_LIST_FAILED:
            return { ...state, ...action.payload };
        case CustomerActionType._CUSTOMER_LIST_RESET_STATE:
            return { ...state, backendMsg: '', backendStatus: '' };
        case CustomerActionType._CUSTOMER_CHANGE_LIST_PARAM:
            return { ...state, ...action.payload };
        // case CustomerActionType._FETCH_PRODUCT_SUCCESS:
        //     return { ...state, ...action.payload, backendStatus: CustomerActionType._FETCH_PRODUCT_SUCCESS };
        // case CustomerActionType._BULK_UPDATE_SUCCESS:
        //     return {
        //         ...state,
        //         ...action.payload,
        //         backendStatus: CustomerActionType._BULK_UPDATE_SUCCESS,
        //         selectedCustomers: [],
        //     };
        // case CustomerActionType._FETCH_PRODUCT_FAIL:
        //     return {
        //         ...state,
        //         backendStatus: CustomerActionType._FETCH_PRODUCT_FAIL,
        //         backendMsg: action.payload.errorMsg,
        //     };
        // case CustomerActionType._BULK_UPDATE_FAIL:
        //     return {
        //         ...state,
        //         backendStatus: CustomerActionType._BULK_UPDATE_FAIL,
        //         backendMsg: action.payload.errorMsg,
        //         selectedCustomers: [],
        //     };
        // case CustomerActionType._RESET_LIST_BACKEND_STATUS:
        //     return { ...state, backendMsg: '', backendStatus: '' };
        // case CustomerActionType._LIST_SELECT_KEYS:
        //     return { ...state, ...action.payload };
        // case CustomerActionType._PAGINATION_UPDATE:
        //     return { ...state, ...action.payload };
        default:
            return state;
    }
};
