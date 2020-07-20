import React from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import productListMeta from '../../../static/data/componentMeta/product/productListMeta';
// import {}
/**
 * default home page
 */
const ProductList = ({ intl }) => {
    const { title, description } = productListMeta;

    return (
        <div className="product-home">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary">
                        <NavLink to="/dashboard/addProduct">{intl.formatMessage({ id: 'product.add' })}</NavLink>
                    </Button>
                }
            />
        </div>
    );
};

export default injectIntl(ProductList);
