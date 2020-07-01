import React from 'react';
// import PropTypes from 'prop-types';
import { Layout } from 'antd';

import './main-header.scss';

const { Header } = Layout;

const MainHeader = () => {
    return <Header className="main-header">{/* <div className="main-header"></div> */}</Header>;
};

MainHeader.propTypes = {};

export default MainHeader;
