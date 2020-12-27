import React from 'react';
import { Card, Row, Col } from 'antd';

import DashboardCard from '../../../Common/DashboardCard/DashboardCard';

const ManageOrders = () => {
    return (
        // <div className="section-container">
        <Row>
            <Col>
                <DashboardCard title="No. of total commandes" value={4} />
            </Col>
        </Row>
        /* </div> */
    );
};

export default ManageOrders;
