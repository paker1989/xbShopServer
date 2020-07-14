import React from 'react';
import { Menu, Icon } from 'antd';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import CustomIcon from '../../../components/Common/CustomIcon/customIcon';

import navData from '../../../static/data/navData';

/**
 * 仅支持两层菜单
 */
const MainMenu = ({ intl, history }) => {
    // console.log(otherProps);
    const navigateTo = (link) => {
        // console.log(link);
        history.push(link);
    };

    const renderIcon = (icon) => {
        return icon.type === 'native' ? <Icon type={icon.name} /> : <CustomIcon name={icon.name} />;
    };

    const renderItem = (item) => {
        return (
            <Menu.Item
                key={item.key}
                onClick={() => {
                    navigateTo(item.link);
                }}
            >
                {renderIcon(item.icon)}
                <span>{intl.formatMessage({ id: item.title })}</span>
            </Menu.Item>
        );
    };

    return (
        <Menu theme="dark" mode="inline">
            {navData.map((item) => {
                if (item.type === 'item') {
                    return renderItem(item);
                }
                return (
                    <Menu.SubMenu
                        title={
                            <span>
                                {renderIcon(item.icon)}
                                <span>{intl.formatMessage({ id: item.title })}</span>
                            </span>
                        }
                        key={item.key}
                    >
                        {item.children.map((element) => renderItem(element))}
                    </Menu.SubMenu>
                );
            })}
        </Menu>
    );
};

export default withRouter(injectIntl(MainMenu));
