import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';

import AddCustomerForm from './addCustomerForm/addCustomerForm';
import SideBar from './customerSideBar';

import * as CustomerMeta from '../../../static/data/componentMeta/user/addCustomerMeta';

import './customerGenerator.scss';

const { defaultMenus } = CustomerMeta.global;

const CustomerGenerator = () => {
    const onSelectItem = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        // debugger;
        console.log(item);
    };

    const menuItems = defaultMenus.slice(0);

    return (
        <div className="customer-generator">
            <div className="addCustomer-form-wrapper section-container">
                <Card bordered={false}>
                    <Row type="flex">
                        <Col xs={24} sm={8} md={6} lg={4} className="sidebar-container">
                            <SideBar onSelect={onSelectItem} menuItems={menuItems} />
                        </Col>
                        <Col
                            xs={24}
                            sm={{ span: 15, offset: 1 }}
                            md={{ span: 17, offset: 1 }}
                            lg={{ span: 19, offset: 1 }}
                        >
                            <AddCustomerForm />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default CustomerGenerator;
