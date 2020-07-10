/**
 *  首页通知中心按钮
 * 出于性能需要，直接渲染notification count, 点击之后再loading notification
 */
import React from 'react';

// import { language } from '../../../static/data/componentMeta/global.meta';
import { Dropdown, Menu, Badge } from 'antd';
import notification from '../../../static/image/icon/notification.svg';

const Notification = ({ count = 0 }) => {
    const menu = (
        <Menu>
            <Menu.Item key="todo">todo</Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Badge count={count}>
                <img src={notification} className="xb-menu-icon clickable" />
            </Badge>
        </Dropdown>
    );
};

export default Notification;
