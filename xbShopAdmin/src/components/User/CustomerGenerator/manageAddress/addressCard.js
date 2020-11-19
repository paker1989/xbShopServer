import React from 'react';
import { Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import CustomIcon from '../../../Common/CustomIcon/customIcon';

import './address.scss';

const { Title } = Typography;

const AddressCard = () => {
    return <div>default address</div>;
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
