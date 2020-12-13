import React from 'react';
import { Button, Card, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import CustomerTable from './customerTable';

import customerListMeta from '../../../static/data/componentMeta/user/customerListMeta';

import './customers.scss';

const CustomerList = ({ intl }) => {
    const { title, description } = customerListMeta.list;

    // console.log('rerender customer list');
    return (
        <div className="customer-list">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary">
                        <NavLink to="/dashboard/addCustomer">{intl.formatMessage({ id: 'user.customer.add' })}</NavLink>
                    </Button>
                }
            />
            <div className="section-container">
                <Card bordered={false}>
                    <Row>
                        <Col>
                            <CustomerTable />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(CustomerList);
