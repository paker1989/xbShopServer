import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import { newUpdateKey, pageSize, filterTypes } from '../../static/data/componentMeta/user/customerListMeta';

import * as CustomerActionCreator from '../../store/action/customerAction';

import * as CustomerActionTypes from '../../store/actionType/customerActionType';
import { getFilterStrings } from '../data.helper';

const useUserCustomers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const allCustomers = useSelector((state) => state.user.customers.fetchedCustomers);
    const currentPage = useSelector((state) => state.user.customers.currentPage);
    const startPage = useSelector((state) => state.user.customers.startPage);
    const sort = useSelector((state) => state.user.customers.sortedCretia);
    const sortOrder = useSelector((state) => state.user.customers.sortedOrder);
    const filter = useSelector((state) => state.user.customers.filter);
    const searchStr = useSelector((state) => state.user.customers.searchStr);

    const backendStatus = useSelector((state) => state.user.customers.backendStatus);
    const backendMsg = useSelector((state) => state.user.customers.backendMsg);

    const filterStr = getFilterStrings(filterTypes, filter);

    const displayedUsers = allCustomers.slice(
        (currentPage - startPage) * pageSize,
        (currentPage - startPage) * pageSize + pageSize
    );

    const newCustomerId = cookie.load(newUpdateKey);

    allCustomers.forEach((item) => {
        /* eslint-disable */
        if (newCustomerId) {
            item.new = item.idCustomer === parseInt(newCustomerId, 10);
        }
        /* eslint-enable */
    });

    useEffect(() => {
        console.log('need to fetch customers');
        dispatch(
            CustomerActionCreator.getCustomer({ filter: filterStr, sort, sortOrder, start: startPage, searchStr })
        );
        setLoading(true);
    }, [`filter:${filterStr}:sort:${sort}^${sortOrder}`, searchStr, startPage]);

    useEffect(() => {
        if (backendStatus === CustomerActionTypes._CUSTOMER_FETCH_LIST_FAILED) {
            setLoading(false);
            message.error(backendMsg);
            dispatch({ type: CustomerActionTypes._CUSTOMER_LIST_RESET_STATE });
        } else if (backendStatus === CustomerActionTypes._CUSTOMER_FETCH_LIST_SUCCESS) {
            setLoading(false);
            dispatch({ type: CustomerActionTypes._CUSTOMER_LIST_RESET_STATE });
        }
    }, [backendStatus, backendMsg]);

    return [loading, displayedUsers];
};

export default useUserCustomers;
