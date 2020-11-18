import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, AutoComplete } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useUnmount } from 'ahooks';
import { withRouter } from 'react-router-dom';

import { addAddressGenerator as addAddressMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import getValidators from './validators';

import './address.scss';

const { formLayout } = addAddressMeta;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl } = props;

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    // const idAddress = parseInt(match.params.idCustomer || -1, 10);
    const { getFieldDecorator } = form;

    const validators = getValidators({ intl, form });

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            /* eslint-disable */
            if (!errors) {
                // TODO
            }
            /* eslint-enable */
        });
    };

    const onSelectCountry = () => {};

    useUnmount(() => {
        CustomerActionCreator.resetAddressSaveBackendStatus();
    });

    // handle save status
    useEffect(() => {
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === CustomerActionType._ADDRESS_SAVE_FAILED) {
            // todo
        } else if (backendStatus === CustomerActionType._ADDRESS_SAVE_SUCCESS) {
            switch (backendMsg) {
                default:
                    break;
                // message.error(intl.formatMessage({ id: `customer.save.error.${backendMsg}` }));
            }
        }
        dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
    }, [backendStatus, backendMsg]);

    return (
        <Form onSubmit={onSubmit} className="add-address-form-body">
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.country' })}>
                {getFieldDecorator(
                    'country',
                    validators.country
                )(
                    <Select
                        onChange={onSelectCountry}
                        placeholder={intl.formatMessage({ id: 'customer.addAddress.country' })}
                    >
                        {/* {userRoles.map((role) => (
                            <Option value={role.idRole} key={`role-${role.idRole}`}>
                                {role.reserved ? <FormattedMessage id={`user.addAdmin.${role.label}`} /> : role.label}
                            </Option>
                        ))} */}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.recipient' })}>
                {getFieldDecorator(
                    'recipient',
                    validators.recipient
                )(
                    <Input
                        className="xb-form-input"
                        placeholder={intl.formatMessage({ id: 'customer.addAddress.recipient' })}
                    />
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.addr1' })}>
                {getFieldDecorator(
                    'addr1',
                    validators.addr1
                )(
                    <Input
                        className="xb-form-input"
                        placeholder={intl.formatMessage({ id: 'customer.addAddress.addr1' })}
                    />
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.addr2' })}>
                {getFieldDecorator(
                    'addr2',
                    validators.addr2
                )(
                    <Input
                        className="xb-form-input"
                        placeholder={intl.formatMessage({ id: 'customer.addAddress.addr2' })}
                    />
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.city' })}>
                {getFieldDecorator(
                    'city',
                    validators.city
                )(
                    <AutoComplete>
                        <Input
                            className="xb-form-input"
                            placeholder={intl.formatMessage({ id: 'customer.addAddress.city' })}
                        />
                    </AutoComplete>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.region' })}>
                {getFieldDecorator(
                    'region',
                    validators.region
                )(
                    <AutoComplete>
                        <Input
                            className="xb-form-input"
                            placeholder={intl.formatMessage({ id: 'customer.addAddress.region' })}
                        />
                    </AutoComplete>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.postcode' })}>
                {getFieldDecorator(
                    'postCode',
                    validators.postCode
                )(
                    <Input
                        className="xb-form-input"
                        placeholder={intl.formatMessage({ id: 'customer.addAddress.postcode' })}
                    />
                )}
            </Form.Item>
            <Form.Item
                label={intl.formatMessage({ id: 'common.phone' })}
                extra={<FormattedMessage id="common.tooltip.addr.phone" />}
            >
                {getFieldDecorator(
                    'phone',
                    validators.phone
                )(<Input className="xb-form-input" placeholder={intl.formatMessage({ id: 'common.phone' })} />)}
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    // phone: state.user.addCustomer.phone,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addAddressForm',
        mapPropsToFields(props) {
            return {
                // categoryName: Form.createFormField({ value: props.categoryName }),
            };
        },
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
