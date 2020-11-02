import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import cookie from 'react-cookies';

import { adminGenerator } from '../../static/data/componentMeta/user/addAdminMeta';
import authConfig from '../../static/data/componentMeta/auth/authMeta';

import * as UserActionCreator from '../../store/action/userAction';
import * as UserActionTypes from '../../store/actionType/userActionType';

const { authedKey } = authConfig;
/**
 * return all admins
 * @param {deleted}  show deleted
 */
const useUserAdmins = (showDeleted) => {
    const dispatch = useDispatch();
    let allAdmins = useSelector((state) => state.user.admins.allAdmins);
    const backendStatus = useSelector((state) => state.user.admins.backendStatus);
    const backendMsg = useSelector((state) => state.user.admins.backendMsg);

    const newAdminId = cookie.load(adminGenerator.newUpdateKey);
    const authed = cookie.load(authedKey);

    allAdmins.forEach((item) => {
        /* eslint-disable */
        if (newAdminId) {
            item.new = item.idUser === parseInt(newAdminId, 10);
        }
        if (authed) {
            item.self = item.idUser === authed.idUser;
        }
        /* eslint-enable */
    });

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

    // debugger;
    if (showDeleted) {
        allAdmins = allAdmins.filter((item) => item.isDeleted);
    } else {
        allAdmins = allAdmins.filter((item) => !item.isDeleted);
    }

    return allAdmins;
};

export default useUserAdmins;
