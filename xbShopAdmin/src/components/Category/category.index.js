import React from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';

const CategoryHome = ({ intl }) => {
    return (
        <NavLink to="/dashboard/addCategory">
            <Button type="primary">{intl.formatMessage({ id: 'cat.addCat' })}</Button>
        </NavLink>
    );
};

export default injectIntl(CategoryHome);
