import React from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import * as ProductActionCreator from '../../../store/action/productActions';

const { Option } = Select;

const BulkActionSelector = ({ intl, onSelect }) => {
    const selectedItems = useSelector((state) => state.product.productListReducer.selectedProducts);
    const bulkAction = useSelector((state) => state.product.productListReducer.bulkAction);

    const handleBulkAction = (label) => {
        if (label !== 'select' && onSelect) {
            onSelect(label, selectedItems);
        }
    };

    return (
        <Select
            value={bulkAction}
            disabled={selectedItems.length === 0}
            // placeholder={intl.formatMessage({ id: 'common.bulk.action' })}
            onSelect={handleBulkAction}
            style={{ width: 180 }}
        >
            <Option key="select">
                <FormattedMessage id="common.bulk.action" />
            </Option>
            <Option key="delete">
                <FormattedMessage id="common.delete" />
            </Option>
            <Option key="offShelf">
                <FormattedMessage id="common.offShelf" />
            </Option>
        </Select>
    );
};

export default injectIntl(BulkActionSelector);
