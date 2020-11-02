import React from 'react';
import { Card, Row, Col } from 'antd';

import AddCustomerForm from './addCustomerForm/addCustomerForm';

const CustomerGenerator = () => {
    return (
        <div className="customer-generator">
            <div className="addCustomer-form-wrapper section-container">
                <Card bordered={false}>
                    <Row /* style={{ margin: '40px 0' }} */>
                        <Col /* md={{ span: 24 }} lg={{ span: 20, offset: 2 }} */>
                            <AddCustomerForm />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default CustomerGenerator;
