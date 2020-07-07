import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import I18nProvider from './components/Common/i18nProvider';
import { useSelector } from 'react-redux';

/* eslint-disable */
import Dashboard from './pages/Dashboard/dashboard';
/* eslint-enable */
import Login from './pages/Login/login';

import './style/app.scss';


const App = () => {
    const globalLocale = useSelector((state) => state.meta.languageReducers.globalLocale);
    return (
        <div className="app-container page-container">
            <I18nProvider locale={globalLocale}>
                <Router basename="/admin">
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/dashboard" component={Dashboard}></Route>
                        <Redirect from="*" to="/login" />
                    </Switch>
                </Router>
            </I18nProvider>
        </div>
    );
};

export default App;
