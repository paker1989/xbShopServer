import React from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

const { Option } = Select;

const BulkActionSelector = ({ intl }) => {
    const selectedItems = useSelector((state) => state.product.productListReducer.selectedProducts);
    const handleBulkAction = (label, option) => {
        console.log(label);
        console.log(option);
    }

    return (
        <Select
            disabled={selectedItems.length === 0}
            placeholder={intl.formatMessage({ id: 'common.batch.action' })}
            onSelect={handleBulkAction}
            style={{ width: 180 }}
        >
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
