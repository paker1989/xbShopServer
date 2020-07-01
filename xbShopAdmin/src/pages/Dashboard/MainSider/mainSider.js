import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import { useResponsive } from 'ahooks';

import './mainSider.scss';

const { Sider } = Layout;

const MainSider = () => {
    const responsive = useResponsive();
    const [collapsed, setCollapsed] = useState(!responsive.middle);

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
            <div>sider</div>
        </Sider>
    );
};

MainSider.propTypes = {
    // navData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default MainSider;
