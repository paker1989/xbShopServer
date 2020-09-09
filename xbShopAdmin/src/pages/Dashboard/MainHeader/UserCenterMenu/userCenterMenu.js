import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Typography, Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../../../static/data/componentMeta/auth/authMeta';
import useUserOptions from '../../../../utils/hooks/useUserOptions';
import * as AuthActionCreator from '../../../../store/action/authAction';
import * as AuthActionType from '../../../../store/actionType/authActionType';

// import { arguments } from 'file-loader';

const { Text } = Typography;
const { userMenuItems } = config;

const UserCenter = ({ user }) => {
    const dispatch = useDispatch();
    const backendStatus = useSelector((state) => state.auth.backendStatus);

    const [userOptions] = useUserOptions(user);

    useEffect(() => {
        if (backendStatus === AuthActionType._AUTH_LOGOUT_SUCCESS) {
            dispatch(AuthActionCreator.resetBackendStatus());
            window.location.reload();
        }
    }, [backendStatus]);

    const handleSelect = (code) => {
        // console.log(e);
        switch (code) {
            case 'logout':
                dispatch(AuthActionCreator.logout());
                break;
            default:
                break;
        }
    };

    const menu = (
        <Menu>
            {userOptions.map((option) => (
                <Menu.Item
                    className="xb-menu-item"
                    key={`user-option-${userMenuItems[option].label}`}
                    onClick={() => handleSelect(userMenuItems[option].code)}
                >
                    <div className="flex-row-container middle">
                        <FormattedMessage id={userMenuItems[option].label} />
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="user-container flex-row-container middle">
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar icon="user" style={{ marginRight: '.6em' }} className="clickable" />
            </Dropdown>
            <Text>徐斌</Text>
        </div>
    );
};

export default UserCenter;
