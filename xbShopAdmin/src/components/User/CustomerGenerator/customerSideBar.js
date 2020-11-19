import React, { useMemo } from 'react';
import { Menu } from 'antd';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { global as metas } from '../../../static/data/componentMeta/user/addCustomerMeta';
import { getUrlParameter } from '../../../utils/url.helper';

const CustomerSideBar = ({ mode = 'inline', intl, match, history, location }) => {
    const menuItems = Object.keys(metas.routes);
    const { url: routerUrl } = match;

    const [selectedKey, disabledKeys] = useMemo(() => {
        // console.log('calculate');
        let _disabledItems;
        const subPath = location.pathname.replace(routerUrl, '');
        const idCustomer = getUrlParameter('customerId') || -1;

        const _selectedKey =
            menuItems.find((item) => item !== 'basic' && subPath.includes(metas.routes[item])) || 'basic';

        if (idCustomer === -1) {
            _disabledItems = menuItems.filter((item) => item !== 'basic');
        } else {
            _disabledItems = [];
        }
        return [_selectedKey, _disabledItems];
    }, [location.pathname, location.search]);

    const onSelect = ({ selectedKeys }) => {
        const subPath = metas.routes[selectedKeys[0]];
        history.push({
            pathname: subPath.length === 0 ? routerUrl : `${routerUrl}/${subPath}`,
            search: location.search,
        });
    };

    return (
        <div>
            <Menu mode={mode} onSelect={onSelect} multiple={false} selectedKeys={[selectedKey]}>
                {menuItems.map((item) => (
                    <Menu.Item disabled={disabledKeys.includes(item)} key={item}>
                        {intl.formatMessage({ id: `customer.menu.${item}` })}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default injectIntl(withRouter(CustomerSideBar));
