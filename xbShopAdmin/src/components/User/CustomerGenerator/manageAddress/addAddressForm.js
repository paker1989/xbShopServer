import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, AutoComplete, Row, Col, Typography } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useUnmount, useDebounceFn } from 'ahooks';
import { withRouter } from 'react-router-dom';

import useCountryList from './hooks/useCountryList';

import { addAddressGenerator as addAddressMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import { getUrlParameter } from '../../../../utils/url.helper';
import getValidators from './validators';

import './address.scss';

const { Title } = Typography;
const { formRowLayout } = addAddressMeta;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl } = props;

    const addressId = getUrlParameter('addressId');
    const countryList = useCountryList();
    const regionAvailables = useSelector((state) => state.user.addAddress.regionAvailables);
    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

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

    const { run: onSearchRegion } = useDebounceFn(
        (searchStr) => {
            if (searchStr.trim().length <= 2) {
                dispatch(CustomerActionCreator.putGeoAutoComplete({ type: 'region', data: [] }));
            } else {
                dispatch(CustomerActionCreator.fetchGeoAutoComplete({ type: 'region', searchStr }));
            }
        },
        { wait: 500 }
    );

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
        <Row>
            <Col {...formRowLayout}>
                <Form onSubmit={onSubmit} className="add-address-form">
                    <Typography>
                        <Title level={4}>
                            <FormattedMessage id={`customer.addAddress.title.${addressId ? 'edit' : 'add'}`} />
                        </Title>
                        {/* <Paragraph>
                            Vous pouvez également récupérer vos colis quand vous le souhaitez dans un point retrait.
                            Pour ajouter un point relais ou une consigne Amazon Locker, cliquez ici.
                        </Paragraph> */}
                    </Typography>
                    <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.recipient' })}>
                        {getFieldDecorator(
                            'recipient',
                            validators.recipient
                        )(
                            <Input
                                className="xb-form-input xxl"
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
                                className="xb-form-input xxl"
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
                                className="xb-form-input xxl"
                                placeholder={intl.formatMessage({ id: 'customer.addAddress.addr2' })}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.country' })}>
                        {getFieldDecorator(
                            'countryCode',
                            validators.country
                        )(
                            <Select
                                className="xb-form-input xxl"
                                onChange={onSelectCountry}
                                placeholder={intl.formatMessage({ id: 'customer.addAddress.country' })}
                            >
                                {countryList.map((country) => (
                                    <Select.Option value={country.countryCode} key={`role-${country.countryId}`}>
                                        <FormattedMessage id={`country.${country.countryCode}`} />
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.region' })}>
                        {getFieldDecorator(
                            'region',
                            validators.region
                        )(
                            <AutoComplete
                                dataSource={regionAvailables}
                                className="xb-form-input xxl"
                                onSearch={onSearchRegion}
                            >
                                <Input
                                    className="xb-form-input xxl"
                                    placeholder={intl.formatMessage({ id: 'customer.addAddress.region' })}
                                />
                            </AutoComplete>
                        )}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'customer.addAddress.city' })}>
                        {getFieldDecorator(
                            'cityId',
                            validators.city
                        )(
                            <AutoComplete>
                                <Input
                                    className="xb-form-input xxl"
                                    placeholder={intl.formatMessage({ id: 'customer.addAddress.city' })}
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
                                className="xb-form-input xxl"
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
                        )(
                            <Input
                                className="xb-form-input xxl"
                                placeholder={intl.formatMessage({ id: 'common.phone' })}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => ({
    addr1: state.user.addAddress.addr1,
    addr2: state.user.addAddress.addr2,
    postCode: state.user.addAddress.postCode,
    cityId: state.user.addAddress.cityId,
    departmentId: state.user.addAddress.departmentId,
    regionId: state.user.addAddress.regionId,
    countryCode: state.user.addAddress.countryCode,
    instruction: state.user.addAddress.instruction,
    phone: state.user.addAddress.phone,
    recipient: state.user.addAddress.recipient,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addAddressForm',
        mapPropsToFields(props) {
            return {
                addr1: Form.createFormField({ value: props.addr1 }),
                addr2: Form.createFormField({ value: props.addr2 }),
                postCode: Form.createFormField({ value: props.postCode }),
                cityId: Form.createFormField({ value: props.cityId }),
                departmentId: Form.createFormField({ value: props.departmentId }),
                regionId: Form.createFormField({ value: props.regionId }),
                countryCode: Form.createFormField({ value: props.countryCode }),
                instruction: Form.createFormField({ value: props.instruction }),
                phone: Form.createFormField({ value: props.phone }),
                recipient: Form.createFormField({ value: props.recipient }),
            };
        },
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
