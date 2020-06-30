import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Sider } = Layout;

const MainSider = (props) => {
    // const { navData } = props;
    return (
        <Sider
            className="app-sider"
            width={208}
            collapsedWidth="80"
            collapsible
            defaultCollapsed={false}
            breakpoint="lg"
        >
            <div>sider</div>
        </Sider>
    );
};

MainSider.propTypes = {
    // navData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default MainSider;
