import React from 'react';
import { Row, Col } from 'antd';

import LoginForm from './loginForm';

import './login.scss';

const Login = () => {
    return (
        <div className="page-container">
            <Row style={{ marginTop: 100 }}>
                <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
                    <Row>
                        <Col span={24}>
                            <LoginForm />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
