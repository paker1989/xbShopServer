import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
// import cookie from 'react-cookies';

import * as UserActionCreator from '../../store/action/userAction';
import * as UserActionTypes from '../../store/actionType/userActionType';
/**
 * return all user accesses
 */
const useUserAccesses = () => {
    const dispatch = useDispatch();
    const allUserAccesses = useSelector((state) => state.user.admins.allUserAccesses);
    const backendStatus = useSelector((state) => state.user.admins.backendStatus);
    const backendMsg = useSelector((state) => state.user.admins.backendMsg);

    useEffect(() => {
        if (allUserAccesses.length === 0) {
            dispatch(UserActionCreator.fetchAllUserAccesses());
        }
    }, []);

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ROLE_FETCH_ALL_USERACCESSES_FAILED) {
            message.error(backendMsg);
            dispatch(UserActionCreator.resetAdminsBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return allUserAccesses;
};

export default useUserAccesses;
