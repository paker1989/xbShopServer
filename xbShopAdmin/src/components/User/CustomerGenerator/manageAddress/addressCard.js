import React from 'react';
import { Typography, Card, Descriptions } from 'antd';
import { FormattedMessage } from 'react-intl';

import CustomIcon from '../../../Common/CustomIcon/customIcon';

import './address.scss';

const { Title } = Typography;

const AddressCard = ({ address }) => {
    const { recipient, addr1, addr2, city, countryCode, postCode, phone } = address;
    return (
        <Card size="small" title="Par default">
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
    );
};

AddressCard.ADD = () => {
    return (
        <div className="address-card-container">
            <div className="add-container flex-row-container column center middle clickable">
                <CustomIcon name="plus" />
                <Title level={4} className="add-text">
                    <FormattedMessage id="customer.addaddress" />
                </Title>
            </div>
        </div>
    );
};

export default AddressCard;
