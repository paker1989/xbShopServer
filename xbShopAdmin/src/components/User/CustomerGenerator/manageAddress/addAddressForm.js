import React, { useEffect, useState, createRef, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, AutoComplete, Row, Col, Typography, Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useUnmount, useDebounceFn } from 'ahooks';
import { withRouter } from 'react-router-dom';

import useCountryList from './hooks/useCountryList';

import { addAddressGenerator as addAddressMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import { getUrlParameter } from '../../../../utils/url.helper';
import useAvailableAutos from './hooks/useAvailableAutos';
import getValidators from './validators';

import './address.scss';

const { Title } = Typography;
const { formRowLayout } = addAddressMeta;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl, countryCode, history } = props;

    const [regionSearchStr, setRegionSearchStr] = useState('');
    const [citySearchStr, setCitySearchStr] = useState('');

    const addressId = getUrlParameter('addressId') || -1;

    const countryList = useCountryList();
    const regionAvailables = useAvailableAutos(countryCode, regionSearchStr, 'region');
    const cityAvailables = useAvailableAutos(countryCode, citySearchStr, 'city');

    const backendStatus = useSelector((state) => state.user.addAddress.backendStatus);
    const backendMsg = useSelector((state) => state.user.addAddress.backendMsg);

    const { getFieldDecorator } = form;

    const validators = getValidators({ intl, form });

    const cancelEdition = () => {
        history.goBack();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            console.log(values);
            /* eslint-disable */
            if (!errors) {
                // TODO
                dispatch(CustomerActionCreator.saveAddress({ ...values, idAddress: addressId, action: 'save' }));
            }
            /* eslint-enable */
        });
    };

    const onSelectCountry = () => {};

    const { run: onSearchRegion } = useDebounceFn(
        (searchStr) => {
            setRegionSearchStr(searchStr);
        },
        { wait: 500 }
    );

    const { run: onSearchCity } = useDebounceFn(
        (searchStr) => {
            // console.log('set city search');
            setCitySearchStr(searchStr);
        },
        { wait: 500 }
    );

    const onSelectCity = (city) => {
        const cityObj = cityAvailables.find((item) => item.id === city.id);
        if (cityObj) {
            form.setFieldsValue({ postCode: cityObj.postCode });
        }
    };

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
                            'city',
                            validators.city
                        )(
                            <AutoComplete
                                dataSource={cityAvailables}
                                className="xb-form-input xxl"
                                onSearch={onSearchCity}
                                onSelect={onSelectCity}
                            >
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
                    <Form.Item
                        label={intl.formatMessage({ id: 'common.instruction' })}
                        // extra={<FormattedMessage id="common.tooltip.instruction" />}
                    >
                        {getFieldDecorator(
                            'instruction',
                            validators.instruction
                        )(
                            <Typography>
                                {/* <Paragraph> */}
                                {/* {intl.formatMessage({ id: 'common.tooltip.instruction' })} */}
                                {/* <Text>
                                    <FormattedMessage id="common.tooltip.instruction" />
                                </Text> */}
                                {/* </Paragraph> */}
                                {/* <Input
                                    className="xb-form-input xxl"
                                    placeholder={intl.formatMessage({ id: 'common.tooltip.instruction' })}
                                /> */}
                                <Input.TextArea
                                    placeholder={intl.formatMessage({ id: 'common.tooltip.instruction' })}
                                    className="fixed-vert xb-form-input xxl"
                                    rows={5}
                                />
                            </Typography>
                        )}
                    </Form.Item>
                    {/* <Button type="primary" htmlType="submit">
                        <FormattedMessage id="common.confirm.back" />
                    </Button> */}
                    <Row>
                        <Col>
                            <Button htmlType="button" style={{ marginRight: 10 }} onClick={cancelEdition}>
                                <FormattedMessage id="common.cancel" />
                            </Button>
                            <Button type="primary" htmlType="submit">
                                <FormattedMessage id="common.confirm.back" />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => ({
    addr1: state.user.addAddress.addr1,
    addr2: state.user.addAddress.addr2,
    postCode: state.user.addAddress.postCode,
    city: state.user.addAddress.city,
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
                city: Form.createFormField({ value: props.city }),
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
