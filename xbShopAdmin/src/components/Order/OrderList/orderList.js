import React, { useState, useCallback } from 'react';
import { Card, Row, Col, Tabs, Typography, Icon, Divider, Tooltip } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';

import AttributSearcher from '../../Common/AttributSearcher/attributSearcher';

import './orderList.scss';

const { TabPane } = Tabs;
const { Text } = Typography;

const OrderList = ({ intl }) => {
    // const activeTab = useSelector((state) => state.user.admins.teamSubTab);
    const activeTab = 'toDeliver';

    const bindSearch = useState({
        orderRef: '',
        recipient: '',
        shipRef: '',
    });

    const handleSearch = () => {
        // todo
    };

    const actionSearch = useCallback(() => {
        // todo
    }, []);

    const searchPairs = [
        {
            inputVal: bindSearch.orderRef,
            labelText: 'order.common.orderRef',
            placeholder: 'order.common.orderRef',
            onChange: handleSearch,
        },
        {
            inputVal: bindSearch.recipient,
            labelText: 'order.common.recipient',
            placeholder: 'order.common.recipient',
            onChange: handleSearch,
        },
        {
            inputVal: bindSearch.shipRef,
            labelText: 'order.common.shipRef',
            placeholder: 'order.common.shipRef',
            onChange: handleSearch,
        },
    ];

    return (
        <div className="section-container order-list">
            <Card bordered={false}>
                <Row>
                    <Col>
                        <Tabs activeKey={activeTab}>
                            <TabPane
                                tab={intl.formatMessage({ id: 'order.status.toDeliver' })}
                                key="toDeliver"
                            ></TabPane>
                            <TabPane
                                tab={intl.formatMessage({ id: 'order.status.toReceive' })}
                                key="toReceive"
                            ></TabPane>
                            <TabPane
                                tab={intl.formatMessage({ id: 'order.status.completed' })}
                                key="completed"
                            ></TabPane>
                            <TabPane tab={intl.formatMessage({ id: 'order.status.canceled' })} key="canceled"></TabPane>
                            <TabPane tab={intl.formatMessage({ id: 'order.status.toPay' })} key="toPay"></TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <Row type="flex" justify="end">
                    <Text strong>
                        <FormattedMessage id="common.switch.view" />
                    </Text>
                    <span className="view-option-container flex-row-container center middle">
                        <Tooltip title={intl.formatMessage({ id: 'common.view.list' })} placement="top">
                            <Icon className="clickable" type="unordered-list" />
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip title={intl.formatMessage({ id: 'common.view.info' })} placement="top">
                            <Icon className="clickable selected" type="table" />
                        </Tooltip>
                    </span>
                </Row>
                <AttributSearcher searchPairs={searchPairs} onSubmit={actionSearch} />
            </Card>
        </div>
    );
};

export default injectIntl(OrderList);
