import React from 'react';
import { Row, Col, Typography } from 'antd';

import DashboardCard from '../../../Common/DashboardCard/DashboardCard';

const { Title } = Typography;

const ManageOrders = () => {
    return (
        <div className="manage-orders">
            <Row type="flex" justify="flex-start">
                <Col sm={{ span: 18, offset: 2 }} md={{ span: 22, offset: 0 }}>
                    <Title level={4}>Vos commandes</Title>
                    <Row type="flex" justify="space-between">
                        <DashboardCard title="No. of total commandes" value={4} bgColor="#1890FF" />
                        <DashboardCard title="No. de commandes soumis" value={2} bgColor="#7BD34F" />
                        <DashboardCard title="Somme de consom." value="¥123.00" bgColor="#E47373" />
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default ManageOrders;
