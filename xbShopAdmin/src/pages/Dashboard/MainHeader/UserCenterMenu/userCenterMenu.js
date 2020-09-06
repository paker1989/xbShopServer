import React from 'react';
import { Menu, Icon, Dropdown, Typography, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useUserOptions from '../../../../utils/hooks/useUserOptions';

const { Title, Text } = Typography;
// import LanguageMenu from '../../../components/Common/LanguageMenu/languageMenu';
// import NotificationMenu from '../../../components/Common/Notification/notification';

// import * as MetaActionCreator from '../../../store/action/metaActions';

// import './main-header.scss';

// const menu = (
//    <Menu>
//        <Menu.Item key="todo">todo</Menu.Item>
//    </Menu>
// );
// return (
//    <Dropdown overlay={menu} trigger={['click']}>
//        <Badge count={count}>
//            <img src={notification} alt="notification" className="xb-menu-icon clickable" />
//        </Badge>
//    </Dropdown>
// );

const UserCenter = ({ user }) => {
   const [userOptions] = useUserOptions(user);

    const menu = (
        <Menu>
            <Menu.Item key="todo">todo</Menu.Item>
        </Menu>
    );

    return (
        <div className="user-container flex-row-container middle">
            <Dropdown overlay={menu} trigger={['click']}>
                {/* <Icon type="user" style={{ marginRight: '.6em' }} /> */}
                <Avatar icon="user" style={{ marginRight: '.6em' }} className="clickable" />
            </Dropdown>
            <Text>徐斌</Text>
        </div>
    );
};

export default UserCenter;
