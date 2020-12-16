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
    backendMsg: '',
    backendStatus: '',
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
        default:
            return state;
    }
};
