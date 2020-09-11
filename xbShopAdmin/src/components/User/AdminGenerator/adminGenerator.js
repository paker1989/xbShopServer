import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { useUnmount } from 'ahooks';
import { withRouter } from 'react-router-dom';

import AddAdminForm from './addAdminForm';
import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import HLPageMeta from '../../../static/data/componentMeta/user/addAdminMeta';

// import * as adminsActionCreator from '../../../store/action/userAction';

import './adminGenerator.scss';

const AdminGenerator = ({ intl, history }) => {
    const dispatch = useDispatch();
    const { description, title } = HLPageMeta.adminGenerator;

    // useUnmount(() => {
    //     dispatch(adminsActionCreator.resetAddProduct());
    // });

    const returnToList = (e) => {
        e.preventDefault();
        history.push('/dashboard/teamList');
    };

    return (
        <div className="admin-generator">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary" onClick={returnToList}>
                        {intl.formatMessage({ id: 'common.return.list' })}
                    </Button>
                }
            />
            <div className="addAdmin-form-wrapper section-container">
                <Card bordered={false}>
                    <Row style={{ margin: '40px 0' }}>
                        <Col md={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                            <AddAdminForm />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default withRouter(injectIntl(AdminGenerator));
