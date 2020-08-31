import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import frFR from 'antd/es/locale/fr_FR';
import zhCN from 'antd/es/locale/zh_CN';
import { useSelector } from 'react-redux';

import I18nProvider from './components/Common/i18nProvider';
/* eslint-disable */
import Dashboard from './pages/Dashboard/dashboard';
/* eslint-enable */
import Login from './pages/Login/login';

import './style/app.scss';

const App = () => {
    const globalLocale = useSelector((state) => state.meta.languageReducers.globalLocale);
    let antLocale;
    switch (globalLocale) {
        case 'zh':
            antLocale = zhCN;
            break;
        case 'fr':
            antLocale = frFR;
            break;
        default:
            break;
    }
    return (
        <div className="app-container page-container">
            <I18nProvider locale={globalLocale}>
                <ConfigProvider locale={antLocale}>
                    <Router basename="/admin">
                        <Switch>
                            <Route
                                path="/login"
                                render={() => {
                                    // return authFlag ? <Redirect to="/dashboard" /> : <Login />;
                                    return <Login />;
                                }}
                            />
                            <Route
                                path="/dashboard"
                                render={() => {
                                    // return authFlag ? <Dashboard /> : <Redirect to="/login" />;
                                    return <Dashboard />;
                                }}
                            />
                            <Redirect from="*" to="/login" />
                        </Switch>
                    </Router>
                </ConfigProvider>
            </I18nProvider>
        </div>
    );
};

export default App;
