import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Sider } = Layout;

const MainSider = (props) => {
    const { navData } = props;
};

MainSider.propTypes = {
    navData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
