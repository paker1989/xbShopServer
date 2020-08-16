import React from 'react';
import { Row, Col } from 'antd';
import { useMount } from 'ahooks';
import cookie from 'react-cookies';

import { useDispatch } from 'react-redux';

import LoginForm from './loginForm';

import AuthMeta from '../../static/data/componentMeta/auth/authMeta';
import * as AuthActionCreator from '../../store/action/authAction';

import './login.scss';

const { autoLoginKey } = AuthMeta;

const Login = () => {
    const dispatch = useDispatch();

    useMount(() => {
        const userLogin = cookie.load(autoLoginKey);

        if (userLogin) {
            dispatch(AuthActionCreator.autoLogin({ userLogin }));
        }
    });

    return (
        <div className="login-container">
            <Row className="login-row">
                <Col md={{ offset: 7, span: 10 }} lg={{ offset: 9, span: 6 }}>
                    <Row>
                        <Col span={24}>
                            <LoginForm />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="copyright">
                <span>Copyright @ 2019 XU Bin</span>
            </div>
        </div>
    );
};

export default Login;
