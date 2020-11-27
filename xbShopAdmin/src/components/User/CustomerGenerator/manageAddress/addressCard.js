import React from 'react';
import cx from 'classnames';
import { Typography, Card, Descriptions, Icon, Tooltip } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import CustomIcon from '../../../Common/CustomIcon/customIcon';

import './address.scss';

const { Title } = Typography;

const AddressCard = ({ address, intl }) => {
    const { recipient, addr1, addr2, city, countryCode, postCode, phone, isDefault } = address;
    const actions = [
        { label: 'edit', icon: 'edit' },
        { label: 'delete', icon: 'delete' },
    ];
    if (!isDefault) {
        actions.push({ label: 'setDefault', icon: 'pushpin' });
    }

    const addressCls = cx('address-card-container', {
        'is-new': address.new,
    });

    return (
        <div className={addressCls}>
            <Card
                hoverable
                size="small"
                title={isDefault ? intl.formatMessage({ id: 'common.byDefault' }) : null}
                actions={actions.map((type) => {
                    return (
                        <Tooltip title={intl.formatMessage({ id: `common.tooltip.${type.label}` })}>
                            <Icon type={type.icon} key={type.label} />
                        </Tooltip>
                    );
                })}
            >
                <Descriptions title={recipient} column={1}>
                    <Descriptions.Item>{addr1}</Descriptions.Item>
                    {addr2 && <Descriptions.Item>{addr1}</Descriptions.Item>}
                    <Descriptions.Item>{`${city}, ${postCode}`}</Descriptions.Item>
                    <Descriptions.Item>
                        <FormattedMessage id={`country.${countryCode}`} />
                    </Descriptions.Item>
                    {phone && (
                        <Descriptions.Item>
                            <FormattedMessage id="common.tooltip.phone" values={{ phone }} />
                        </Descriptions.Item>
                    )}
                </Descriptions>
            </Card>
        </div>
    );
};

/* eslint-disable */
AddressCard.ADD = ({ onAdd }) => {
    return (
        <div className="address-card-container clickable" onClick={onAdd}>
            <div className="add-container flex-row-container column center middle clickable">
                <CustomIcon name="plus" />
                <Title level={4} className="add-text">
                    <FormattedMessage id="customer.addaddress" />
                </Title>
            </div>
        </div>
    );
};

export default injectIntl(AddressCard);
