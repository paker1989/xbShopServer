import React from 'react';
import { Row, Card, Statistic } from 'antd';

import './dashboardCard.scss';

const DashboardCard = ({ title, value, handleClick, bgColor = '#1890FF' }) => {
    const onClick = () => {
        if (typeof handleClick !== 'undefined') {
            handleClick();
        }
    };

    return (
        <div className="dashboard-card">
            <Card style={{ backgroundColor: bgColor }}>
                <Row type="flex" justify="center" align="center">
                    <Statistic title={title} value={value}></Statistic>
                </Row>
            </Card>
        </div>
    );
};

export default DashboardCard;
