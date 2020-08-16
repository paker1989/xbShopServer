import React from 'react';
import { Row, Col } from 'antd';

import LoginForm from './loginForm';

import './login.scss';

const Login = () => {
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
