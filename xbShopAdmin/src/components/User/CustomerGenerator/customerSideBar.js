import React from 'react';
import { Menu } from 'antd';
import { injectIntl } from 'react-intl';

const CustomerSideBar = ({ menuItems, mode = 'inline', onSelect, intl }) => {
    return (
        <div>
            <Menu mode={mode} onSelect={onSelect}>
                {menuItems.map((item) => (
                    <Menu.Item key={item}>{intl.formatMessage({ id: `customer.menu.${item}` })}</Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default injectIntl(CustomerSideBar);
