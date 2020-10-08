import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import AddRoleForm from './addRoleForm';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import HLPageMeta from '../../../static/data/componentMeta/user/addRoleMeta';

import './roleGenerator.scss';

const RoleGenerator = ({ intl, history }) => {
    const { description, title } = HLPageMeta.roleGenerator;

    const returnToList = (e) => {
        e.preventDefault();
        history.push('/dashboard/teamList');
    };

    return (
        <div className="role-generator">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary" onClick={returnToList}>
                        {intl.formatMessage({ id: 'common.return.list' })}
                    </Button>
                }
            />
            <div className="role-form-wrapper section-container">
                <Card bordered={false}>
                    <Row style={{ margin: '40px 0' }}>
                        <Col md={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                            <AddRoleForm />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default withRouter(injectIntl(RoleGenerator));
