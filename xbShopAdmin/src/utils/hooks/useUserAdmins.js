import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import { adminGenerator } from '../../static/data/componentMeta/user/addAdminMeta';

import * as UserActionCreator from '../../store/action/userAction';
import * as UserActionTypes from '../../store/actionType/userActionType';

/**
 * return all admins
 * @param {deleted}  show deleted
 */
const useUserAdmins = (showDeleted) => {
    const dispatch = useDispatch();
    const allAdmins = useSelector((state) => state.user.admins.allAdmins);
    const backendStatus = useSelector((state) => state.user.admins.backendStatus);
    const backendMsg = useSelector((state) => state.user.admins.backendMsg);

    const newAdminId = cookie.load(adminGenerator.newUpdateKey);
    if (newAdminId) {
        allAdmins.forEach((item) => {
            /* eslint-disable */
            item.new = item.idUser === parseInt(newAdminId, 10);
            /* eslint-enable */
        });
    }

    useEffect(() => {
        if (allAdmins.length === 0) {
            dispatch(UserActionCreator.fetchAllAdmins());
        }
    }, []);

    useEffect(() => {
        if (backendStatus === UserActionTypes._USER_ADMIN_FETCH_ALL_FAILED) {
            message.error(backendMsg);
            dispatch(UserActionCreator.resetAdminsBackendStatus());
        }
    }, [backendStatus, backendMsg]);

    return showDeleted ? allAdmins.filter((item) => item.isDeleted) : allAdmins.filter((item) => !item.isDeleted);
};

export default useUserAdmins;
