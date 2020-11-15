import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useUnmount } from 'ahooks';
import { withRouter } from 'react-router-dom';

import AddCustomerForm from './addCustomerForm/addCustomerForm';
import ManageAddress from './manageAddress/manageAddress';
import SideBar from './customerSideBar';

import useCustomerMenuItems from './hooks/useMenuItems';
import * as CustomerCmnActionType from '../../../store/actionType/customerActionType';

import './customerGenerator.scss';

const { Title } = Typography;

const CustomerGenerator = ({ match }) => {
    const idCustomer = parseInt(match.params.idCustomer || -1, 10);
    const dispatch = useDispatch();

    const selectedMenu = useSelector((state) => state.user.customerCmn.selectMenu);
    const [menuItems, disabledItems] = useCustomerMenuItems(idCustomer);

    const onSelectItem = ({ selectedKeys }) => {
        dispatch({ type: CustomerCmnActionType._SET_SELECT_MENU, payload: selectedKeys[0] });
    };

    useUnmount(() => {
        dispatch({ type: CustomerCmnActionType._CUSTOMER__GLOBAL_RESET });
    });

    return (
        <div className="customer-generator">
            <div className="addCustomer-form-wrapper section-container">
                <Card bordered={false}>
                    <Row type="flex">
                        <Col xs={24} sm={8} md={6} lg={4} className="sidebar-container">
                            <SideBar
                                onSelect={onSelectItem}
                                menuItems={menuItems}
                                selectedKeys={[selectedMenu]}
                                disabledKeys={disabledItems}
                            />
                        </Col>
                        <Col
                            xs={24}
                            sm={{ span: 15, offset: 1 }}
                            md={{ span: 17, offset: 1 }}
                            lg={{ span: 19, offset: 1 }}
                        >
                            <div className="prefer-left">
                                <Title level={4}>
                                    <FormattedMessage id={`customer.title.${selectedMenu}`} />
                                </Title>
                            </div>
                            {selectedMenu === 'basic' && <AddCustomerForm />}
                            {selectedMenu === 'address' && <ManageAddress />}
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default withRouter(CustomerGenerator);
