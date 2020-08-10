import React from 'react';
import { Select, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

const { Option } = Select;

const BulkActionSelector = ({ intl, onSelect }) => {
    const selectedItems = useSelector((state) => state.product.productListReducer.selectedProducts);
    const bulkAction = useSelector((state) => state.product.productListReducer.bulkAction);

    const handleBulkAction = (label) => {
        if (label !== 'select' && onSelect) {
            Modal.confirm({
                title: intl.formatMessage({ id: 'common.bulk.action.confirm' }),
                okText: intl.formatMessage({ id: 'common.yes' }),
                cancelText: intl.formatMessage({ id: 'common.cancel' }),
                onOk: () => {
                    onSelect(label, selectedItems);
                },
            });
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
            <Option key="onShelf">
                <FormattedMessage id="common.onShelf" />
            </Option>
        </Select>
    );
};

export default injectIntl(BulkActionSelector);
