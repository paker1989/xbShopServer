import React from 'react';
import { Row, Card, Statistic } from 'antd';

const DashboardCard = ({ title, value, handleClick }) => {
    const onClick = () => {
        if (typeof handleClick !== 'undefined') {
            handleClick();
        }
    };

    return (
        <div className="dashboard-card">
            <Card>
                <Row type="flex" justify="center" align="center">
                    <Statistic title={title} value={value}></Statistic>
                </Row>
            </Card>
        </div>
    );
};

export default DashboardCard;
