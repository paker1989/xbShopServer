import React from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { Typography, Card, Descriptions, Icon, Tooltip, Popconfirm, Modal } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import * as AddressActionCreator from '../../../../store/action/customerAction';
import CustomIcon from '../../../Common/CustomIcon/customIcon';

import './address.scss';

const { Title } = Typography;

const AddressCard = ({ address, intl }) => {
    const dispatch = useDispatch();
    const { recipient, addr1, addr2, city, countryCode, postCode, phone, isDefault, idAddress, customerId } = address;
    const actions = [{ label: 'edit', icon: 'edit' }];
    if (!isDefault) {
        actions.push({ label: 'setDefault', icon: 'pushpin' }, { label: 'delete', icon: 'delete' });
    }

    const addressCls = cx('address-card-container', {
        'is-new': address.new,
        'is-default': isDefault,
    });

    const handleClick = (actionType) => {
        console.log(actionType);
        switch (actionType) {
            case 'delete':
                dispatch(AddressActionCreator.saveAddress({ action: 'delete', addressId: idAddress, customerId }));
                break;
            case 'setDefault':
                Modal.confirm({
                    title: intl.formatMessage({ id: 'customer.address.confirm.setDefault' }),
                    okText: intl.formatMessage({ id: 'common.tooltip.setDefault' }),
                    cancelText: intl.formatMessage({ id: 'common.cancel' }),
                    onOk: () => {
                        dispatch(
                            AddressActionCreator.saveAddress({ action: 'setDefault', addressId: idAddress, customerId })
                        );
                    },
                });

                break;
            default:
                break;
        }
    };

    return (
        <div className={addressCls}>
            <Card
                hoverable
                size="small"
                title={isDefault ? intl.formatMessage({ id: 'common.byDefault' }) : null}
                actions={actions.map((type) => {
                    return type.label === 'delete' ? (
                        <Popconfirm
                            placement="top"
                            title={intl.formatMessage({ id: 'common.delete.confirm' })}
                            onConfirm={() => {
                                handleClick(type.label);
                            }}
                        >
                            <Tooltip
                                title={intl.formatMessage({ id: `common.tooltip.${type.label}` })}
                                placement="bottom"
                            >
                                <Icon type={type.icon} key={type.label} />
                            </Tooltip>
                        </Popconfirm>
                    ) : (
                        <Tooltip title={intl.formatMessage({ id: `common.tooltip.${type.label}` })}>
                            <Icon
                                type={type.icon}
                                key={type.label}
                                onClick={() => {
                                    handleClick(type.label);
                                }}
                            />
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
