import React from 'react';
import { Menu } from 'antd';
import { injectIntl } from 'react-intl';

const CustomerSideBar = ({ menuItems, mode = 'inline', onSelect, intl, selectedKeys = [], disabledKeys = [] }) => {
    return (
        <div>
            <Menu mode={mode} onSelect={onSelect} multiple={false} selectedKeys={selectedKeys}>
                {menuItems.map((item) => (
                    <Menu.Item disabled={disabledKeys.includes(item)} key={item}>
                        {intl.formatMessage({ id: `customer.menu.${item}` })}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default injectIntl(CustomerSideBar);
