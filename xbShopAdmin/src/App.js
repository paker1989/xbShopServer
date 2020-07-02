import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard/dashboard';
import Login from './pages/Login/login';

import './style/app.scss';

const App = () => {
    return (
        <div className="app-container page-container">
            <Router basename="/admin">
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/dashboard" component={Dashboard}></Route>
                    <Redirect from="*" to="/login" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
