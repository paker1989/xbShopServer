import React from 'react';
import { Button } from 'antd';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import customerListMeta from '../../../static/data/componentMeta/user/customerListMeta';

// import * as UserActionCreator from '../../../store/action/userAction';

const UserList = ({ intl }) => {
    const { title, description } = customerListMeta.list;
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
        </div>
    );
};

export default injectIntl(UserList);
