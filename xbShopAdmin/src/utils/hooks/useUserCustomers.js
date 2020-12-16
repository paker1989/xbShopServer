import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import {
    newUpdateKey,
    pageSize,
    pageFetched,
    filterTypes,
} from '../../static/data/componentMeta/user/customerListMeta';

import * as CustomerActionCreator from '../../store/action/customerAction';

import * as CustomerActionTypes from '../../store/actionType/customerActionType';
import { getFilterStrings } from '../data.helper';

const useUserCustomers = (intl) => {
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
    const formBackendStatus = useSelector((state) => state.user.addCustomer.backendStatus);

    const filterStr = getFilterStrings(filterTypes, filter);

    const newCustomerId = cookie.load(newUpdateKey);

    const [displayedUsers, setDisplayedUsers] = useState([]);

    allCustomers.forEach((item) => {
        /* eslint-disable */
        if (newCustomerId) {
            item.new = item.idCustomer === parseInt(newCustomerId, 10);
        }
        /* eslint-enable */
    });

    useEffect(() => {
        // console.log('need to fetch customers');
        dispatch(
            CustomerActionCreator.getCustomer({
                filter: filterStr,
                sort,
                sortOrder,
                start: startPage,
                searchStr,
                pSize: pageSize,
                limit: pageFetched * pageSize,
            })
        );
        setLoading(true);
    }, [`filter:${filterStr}:sort:${sort}^${sortOrder}`, searchStr]);

    useEffect(() => {
        // debugger;
        if (startPage === currentPage) {
            return;
        }
        const startIndex = (currentPage - startPage) * pageSize;
        if (startIndex > allCustomers.length - 1 || startIndex < 0) {
            dispatch(
                CustomerActionCreator.getCustomer({
                    filter: filterStr,
                    sort,
                    sortOrder,
                    start: currentPage,
                    searchStr,
                    pSize: pageSize,
                    limit: pageFetched * pageSize,
                })
            );
            setLoading(true);
        } else {
            setDisplayedUsers(
                allCustomers.slice(
                    (currentPage - startPage) * pageSize,
                    (currentPage - startPage) * pageSize + pageSize
                )
            );
        }
    }, [startPage, currentPage]);

    useEffect(() => {
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === CustomerActionTypes._CUSTOMER_FETCH_LIST_FAILED) {
            setLoading(false);
            message.error(backendMsg);
        } else if (backendStatus === CustomerActionTypes._CUSTOMER_FETCH_LIST_SUCCESS) {
            setLoading(false);
            setDisplayedUsers(
                allCustomers.slice(
                    (currentPage - startPage) * pageSize,
                    (currentPage - startPage) * pageSize + pageSize
                )
            );
        }
        dispatch({ type: CustomerActionTypes._CUSTOMER_LIST_RESET_STATE });
    }, [backendStatus, backendMsg]);

    useEffect(() => {
        if (formBackendStatus === CustomerActionTypes._CUSTOMER_SAVE_SUCCESS) {
            setLoading(true);
            dispatch(
                CustomerActionCreator.getCustomer({
                    filter: filterStr,
                    sort,
                    sortOrder,
                    start: currentPage,
                    searchStr,
                    pSize: pageSize,
                    limit: pageFetched * pageSize,
                })
            );
            message.success(intl.formatMessage({ id: 'common.delete.success' }));
            dispatch(CustomerActionCreator.resetCustomerSaveBackendStatus());
        }
    }, [formBackendStatus]);

    return [loading, displayedUsers];
};

export default useUserCustomers;
