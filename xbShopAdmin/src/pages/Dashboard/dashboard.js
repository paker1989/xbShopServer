import React, { Suspense, lazy } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainSider from './MainSider/mainSider';
import MainHeader from './MainHeader/mainHeader';

import ContainerSkeleton from '../../components/Common/ContainerSkeleton/containerSkeleton';
// import ProductGenerator from '../../components/Product/ProductGenerator/productGenerator';

import NavData from '../../static/data/navData';

import './dashboard.scss';

const { Content } = Layout;

const LazyProductGenerator = lazy(() => import('../../components/Product/ProductGenerator/productGenerator'));

const Dashboard = () => {
    return (
        <Layout className="page-container">
            <MainSider />
            <Layout>
                <MainHeader />
                <Content>
                    <Suspense fallback={<ContainerSkeleton />}>
                        <Switch>
                            <Route key="addProduct" path="/dashboard/addProduct" component={LazyProductGenerator} />
                            <Redirect path="*" to="/dashboard/addProduct" />
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
