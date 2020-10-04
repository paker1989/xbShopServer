import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import * as UserActionCreator from '../../store/action/userAction';
import * as UserActionTypes from '../../store/actionType/userActionType';
/**
 * return all user roles
 */
const useUserRoles = () => {
    const dispatch = useDispatch();
    const allUserRoles = useSelector((state) => state.user.admins.allUserRoles);
    const backendStatus = useSelector((state) => state.user.admins.backendStatus);
    const backendMsg = useSelector((state) => state.user.admins.backendMsg);

    useEffect(() => {
        if (allUserRoles.length === 0) {
            dispatch(UserActionCreator.fetchAllUserroles());
        }
    }, []);

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ADMIN_FETCH_ALL_USERROLES_FAILED) {
            message.error(backendMsg);
            dispatch(UserActionCreator.resetAdminsBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return allUserRoles;
};

export default useUserRoles;
