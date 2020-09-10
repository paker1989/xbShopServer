import React, { useState } from 'react';
import { Card, Row, Col, Tabs } from 'antd';
import { injectIntl } from 'react-intl';

import TeamTable from './teamTable/teamTable';
import RoleTable from './roleTable/roleTable';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import userListMeta from '../../../static/data/componentMeta/user/userListMeta';

const { TabPane } = Tabs;

const TeamList = ({ intl }) => {
    const { title, description, layout } = userListMeta.team;
    const [currentTab, setCurrentTab] = useState('team'); // team, permission
    const [loading, setLoading] = useState(false);

    const onTabClick = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <div className="team-list">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
            />
            <div className="section-container">
                <Card bordered={false}>
                    <Row>
                        <Col>
                            <Tabs activeKey={currentTab} onTabClick={onTabClick}>
                                <TabPane tab={intl.formatMessage({ id: 'user.team.list.teams' })} key="team">
                                    <Row>
                                        <Col {...layout.table}>
                                            <TeamTable loading={loading} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane
                                    tab={intl.formatMessage({ id: 'user.team.list.permissions' })}
                                    key="permission"
                                >
                                    <RoleTable />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(TeamList);
