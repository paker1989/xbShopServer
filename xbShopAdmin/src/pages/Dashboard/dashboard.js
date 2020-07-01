import React from 'react';
import { Layout } from 'antd';

import MainSider from './MainSider/mainSider';
import MainHeader from './MainHeader/mainHeader';

// import NavData from '../../static/data/navData';

import './dashboard.scss';

const { Content } = Layout;

const Dashboard = () => {
    return (
        <Layout className="page-container">
            <MainSider />
            <Layout>
                <MainHeader />
                <Content>Content</Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
