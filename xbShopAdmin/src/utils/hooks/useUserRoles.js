import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import { roleGenerator } from '../../static/data/componentMeta/user/addRoleMeta';

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

    const newUserRoleId = cookie.load(roleGenerator.newUpdateKey);
    if (newUserRoleId) {
        allUserRoles.forEach((item) => {
            /* eslint-disable */
            item.new = item.idRole === Number(newUserRoleId);
            /* eslint-enable */
        });
    }

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
