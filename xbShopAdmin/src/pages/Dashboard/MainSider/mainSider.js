import React, { useState, useEffect } from 'react';
import { Layout, Icon } from 'antd';
import { useResponsive } from 'ahooks';

import MenuContent from './menuContent';

import './mainSider.scss';

const { Sider } = Layout;

const MainSider = () => {
    const responsive = useResponsive();
    const [collapsed, setCollapsed] = useState(!responsive.middle);

    useEffect(() => {
        setCollapsed(!responsive.middle);
    }, [responsive.middle]);

    return (
        <Sider
            className="main-sider"
            width={208}
            collapsedWidth={80}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            trigger={
                <Icon
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    style={{ fontSize: 24 }}
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                />
            }
        >
            <MenuContent />
        </Sider>
    );
};

export default MainSider;
