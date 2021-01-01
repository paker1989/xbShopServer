import React from 'react';
import { Row, Col, Typography } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';

import DashboardCard from '../../../Common/DashboardCard/DashboardCard';
import OrderTable from './orderTable';

const { Title } = Typography;

const ManageOrders = ({ intl }) => {
    return (
        <div className="manage-orders">
            <Row type="flex" justify="start">
                <Col sm={{ span: 18, offset: 2 }} md={{ span: 22, offset: 0 }}>
                    <Title level={4}>
                        <FormattedMessage id="order.common.your.commandes" />
                    </Title>
                    <Row type="flex" justify="space-between">
                        <DashboardCard
                            title={intl.formatMessage({ id: 'order.common.nb.totalCommande' })}
                            value={4}
                            bgColor="#1890FF"
                        />
                        <DashboardCard
                            title={intl.formatMessage({ id: 'order.common.nb.submitted.totalCommande' })}
                            value={2}
                            bgColor="#7BD34F"
                        />
                        <DashboardCard
                            title={intl.formatMessage({ id: 'order.common.total.amount' })}
                            value="¥123.00"
                            bgColor="#E47373"
                        />
                    </Row>
                </Col>
            </Row>
            <Row type="flex" justify="start" style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Row className="section-title">
                        <FormattedMessage id="order.common.list.commande" />
                    </Row>
                    <Row>
                        <OrderTable />
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default injectIntl(ManageOrders);
