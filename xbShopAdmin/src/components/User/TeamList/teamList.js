import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import TeamTable from './teamTable/teamTable';
import RoleTable from './roleTable/roleTable';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import userListMeta from '../../../static/data/componentMeta/user/userListMeta';

import * as UserActionCreator from '../../../store/action/userAction';

const { TabPane } = Tabs;

const TeamList = ({ intl }) => {
    const dispatch = useDispatch();
    const { title, description, layout } = userListMeta.team;
    const activeTab = useSelector((state) => state.user.admins.activeTab);
    const [loading /* setLoading */] = useState(false);

    const onTabClick = (tab) => {
        dispatch(UserActionCreator.setActiveTeamListTab(tab));
    };

    return (
        <div className="team-list">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    activeTab === 'team' ? (
                        <Button type="primary">
                            <NavLink to="/dashboard/addAdmin">
                                {intl.formatMessage({ id: 'user.team.addAdmin' })}
                            </NavLink>
                        </Button>
                    ) : (
                        <Button type="primary">
                            <NavLink to="/dashboard/addRole">{intl.formatMessage({ id: 'user.team.addRole' })}</NavLink>
                        </Button>
                    )
                }
            />
            <div className="section-container">
                <Card bordered={false}>
                    <Row>
                        <Col>
                            <Tabs activeKey={activeTab} onTabClick={onTabClick}>
                                <TabPane tab={intl.formatMessage({ id: 'user.team.list.teams' })} key="team">
                                    <Row>
                                        <Col {...layout.teamTable}>
                                            <TeamTable loading={loading} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({ id: 'user.team.list.permissions' })} key="role">
                                    <Row>
                                        <Col {...layout.roleTable}>
                                            <RoleTable />
                                        </Col>
                                    </Row>
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
