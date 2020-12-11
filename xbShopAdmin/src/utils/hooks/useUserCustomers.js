import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import { newUpdateKey, pageSize } from '../../static/data/componentMeta/user/customerListMeta';

import * as CustomerActionCreator from '../../store/action/customerAction';

import * as CustomerActionTypes from '../../store/actionType/customerActionType';

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

    // useEffect(() => {
    //     // console.log('mount user customer');
    //     dispatch(CustomerActionCreator.getCustomer({}));
    //     setLoading(true);
    // }, []);

    // const getCustomerIdsKey = ({ filter = 'NA', sort = 'NA', sortOrder = 'NA' }) =>
    // `${prefix}:${keys.cids}:filter:${filter}:sort:${sort}^${sortOrder}`;
    useEffect(() => {
        console.log('need to fetch customers');
        // console.log(`filter:${filter}:sort:${sort}^${sortOrder}`);
        dispatch(CustomerActionCreator.getCustomer({ filter, sort, sortOrder, start: startPage, searchStr }));
        setLoading(true);
    }, [`filter:${filter}:sort:${sort}^${sortOrder}`, searchStr, startPage]);

    useEffect(() => {
        if (backendStatus === CustomerActionTypes._CUSTOMER_FETCH_LIST_FAILED) {
            setLoading(false);
            message.error(backendMsg);
            dispatch({ type: CustomerActionTypes._CUSTOMER_LIST_RESET_STATE });
        } else if (backendStatus === CustomerActionTypes._CUSTOMER_FETCH_LIST_SUCCESS) {
            setLoading(false);
            dispatch({ type: CustomerActionTypes._CUSTOMER_LIST_RESET_STATE });
        }

        //   if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_FAILED) {
        //     message.error(backendMsg);
        //     dispatch(UserActionCreator.resetAddAdminBackendStatus());
        // } else if (backendStatus === UserActionTypes._USER_ADMIN_UPDATE_SUCCESS) {
        //     message.success(
        //         intl.formatMessage({
        //             id: `user.team.${backendMsg}Admin.success`, // restore or delete or destroy
        //         })
        //     );
        //     dispatch(UserActionCreator.resetAddAdminBackendStatus());
        // }
    }, [backendStatus, backendMsg]);

    return [loading, displayedUsers];
};

export default useUserCustomers;
