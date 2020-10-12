import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { useMount } from 'ahooks';

import MainSider from './MainSider/mainSider';
import MainHeader from './MainHeader/mainHeader';
import ContainerSkeleton from '../../components/Common/ContainerSkeleton/containerSkeleton';
/* eslint-disable */
import LazyComponents from '../../static/data/lazyComponents';
import useAuthenticated from '../../utils/hooks/useAuthenticated';
/* eslint-enable */
import './dashboard.scss';

const { Content } = Layout;
const { prefix, routes } = LazyComponents.dashboard;

const Dashboard = ({ history }) => {
    /* eslint-disable */
    const [authUser, authFlag] = useAuthenticated();
    /* eslint-enable */

    useMount(() => {
        if (!authFlag) {
            history.push('/login');
        }
    });

    return (
        <Layout className="page-container">
            <MainSider />
            <Layout>
                <MainHeader />
                <Content>
                    <Suspense fallback={<ContainerSkeleton />}>
                        <Switch>
                            {routes.map((item) => (
                                <Route key={item.key} path={`/${prefix}/${item.link}`} component={item.source} />
                            ))}
                            <Redirect path="*" to="/dashboard/productList" />
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default withRouter(Dashboard);
