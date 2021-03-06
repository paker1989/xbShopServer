import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Radio, Row, Col, Button, message, Switch, Modal, Typography } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useUnmount } from 'ahooks';
import { withRouter } from 'react-router-dom';

import PasswordConfirmer from '../../../Common/PasswordConfirmer/pwdConfirmer';
import ThumbnailUpload from '../../../Common/ThumbnailUpload/thumbnailUpload';

import { customerGenerator as addCustomerMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import * as ServerErrorType from '../../../../static/data/serverErrorType/customerType';
import getValidators from './validators';
import { getIntegerFromUrlParameter } from '../../../../utils/url.helper';
import { getModifiedValues } from '../../../../utils/data.helper';

import './addCustomerForm.scss';

const { formLayout } = addCustomerMeta;
const { confirm } = Modal;
const { Title } = Typography;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl, history, match } = props;
    const { url: routerUrl } = match;
    // console.log(history);
    const idCustomer = getIntegerFromUrlParameter('customerId') || -1;

    const backendStatus = useSelector((state) => state.user.addCustomer.backendStatus);
    const backendMsg = useSelector((state) => state.user.addCustomer.backendMsg);
    const [passwordMode, setPasswordMode] = useState(idCustomer === -1 ? 'create' : 'standby');

    const { getFieldDecorator } = form;

    const validators = getValidators({ intl, form });

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            /* eslint-disable */
            if (!errors) {
                const { thumbnail, gender: genderVal } = values;
                if (idCustomer === -1) {
                    // create mode
                    if (thumbnail.length === 0) {
                        values.thumbnail = `${window.location.origin}/static/image/avatar_${genderVal}.png`;
                    }
                    dispatch(CustomerActionCreator.saveCustomer({ idCustomer, ...values }));
                } else {
                    // update case
                    const modifieds = getModifiedValues(values, props);
                    console.log(modifieds);
                    if (Object.keys(modifieds).length > 0) {
                        dispatch(CustomerActionCreator.saveCustomer({ idCustomer, ...modifieds, action: 'update' }));
                    } else {
                        message.info(intl.formatMessage({ id: 'customer.info.noModif' }));
                    }
                }
            }
            /* eslint-enable */
        });
    };

    const cancelEdition = () => {
        history.push('/dashboard/customerList');
    };

    useUnmount(() => {
        dispatch(CustomerActionCreator.resetAddCustomerState());
    });

    useEffect(() => {
        if (idCustomer !== -1 && props.email.length === 0) {
            // recipient is mandatory, it is not present means it is accessed directly
            dispatch(CustomerActionCreator.getCustomer({ idCustomer }));
        }
    }, []);

    // handle save status
    useEffect(() => {
        // debugger;
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === CustomerActionType._CUSTOMER_FETCH_FAILED) {
            message.error(backendMsg);
            history.push('/dashboard/customerList');
        }
        if (backendStatus === CustomerActionType._CUSTOMER_SAVE_SUCCESS) {
            if (idCustomer === -1) {
                confirm({
                    title: intl.formatMessage({ id: 'customer.confirm.addaddress.title' }),
                    cancelText: intl.formatMessage({ id: 'customer.confirm.addaddress.cancel' }),
                    okText: intl.formatMessage({ id: 'customer.confirm.addaddress.confirm' }),
                    onOk() {
                        history.push({
                            pathname: `${routerUrl}/address/add`,
                            search: `?customerId=${backendMsg}`,
                        });
                    },
                    onCancel() {
                        history.push('/dashboard/customerList');
                    },
                });
            } else {
                message.success(intl.formatMessage({ id: 'customer.success.update' }));
                dispatch(CustomerActionCreator.getCustomer({ idCustomer }));
            }
        } else if (backendStatus === CustomerActionType._CUSTOMER_SAVE_FAILED) {
            switch (backendMsg) {
                case ServerErrorType._EMAIL_DUPLICA:
                    form.setFields({
                        email: {
                            value: form.getFieldValue('email'),
                            errors: [new Error(intl.formatMessage({ id: `customer.save.error.${backendMsg}` }))],
                        },
                    });
                    break;
                case ServerErrorType._PSEUDO_DUPLICA:
                    form.setFields({
                        pseudo: {
                            value: form.getFieldValue('pseudo'),
                            errors: [new Error(intl.formatMessage({ id: `customer.save.error.${backendMsg}` }))],
                        },
                    });
                    break;
                default:
                    message.error(intl.formatMessage({ id: `customer.save.error.${backendMsg}` }));
            }
        }
        dispatch(CustomerActionCreator.resetCustomerSaveBackendStatus());
    }, [backendStatus, backendMsg]);

    return (
        <div className="addCustomer-basic-container">
            <div className="prefer-left">
                <Title level={4}>
                    <FormattedMessage id="customer.title.basic" />
                </Title>
            </div>
            <Form onSubmit={onSubmit} className="add-customer-form-body">
                <div className="add-customer-form-items view-left">
                    <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.email.mandatory' })}>
                        {getFieldDecorator(
                            'email',
                            validators.email
                        )(
                            <Input
                                className="xb-form-input"
                                placeholder={intl.formatMessage({ id: 'user.addAdmin.email' })}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'common.phone' })}>
                        {getFieldDecorator(
                            'phone',
                            validators.phone
                        )(<Input className="xb-form-input" placeholder={intl.formatMessage({ id: 'common.phone' })} />)}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'common.pseudo' })}>
                        {getFieldDecorator(
                            'pseudo',
                            validators.pseudo
                        )(
                            <Input
                                className="xb-form-input"
                                placeholder={intl.formatMessage({ id: 'common.pseudo' })}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'common.gender' })}>
                        {getFieldDecorator(
                            'gender',
                            validators.gender
                        )(
                            <Radio.Group>
                                <Radio.Button value="m">
                                    <FormattedMessage id="common.gender.m" />
                                </Radio.Button>
                                <Radio.Button value="f">
                                    <FormattedMessage id="common.gender.f" />
                                </Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.isActive' })}>
                        {getFieldDecorator(
                            'isActive',
                            validators.isActive
                        )(
                            <Switch
                                checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                                unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                            />
                        )}
                    </Form.Item>
                    <PasswordConfirmer
                        showGenerate
                        passwordMode={passwordMode}
                        form={form}
                        setPasswordMode={setPasswordMode}
                    />
                    <Row>
                        <Col {...formLayout.labelCol}></Col>
                        <Col {...formLayout.wrapperCol}>
                            {idCustomer === -1 && (
                                <Button htmlType="button" style={{ marginRight: 10 }} onClick={cancelEdition}>
                                    <FormattedMessage id="common.cancel" />
                                </Button>
                            )}
                            {idCustomer === -1 && (
                                <Button type="primary" htmlType="submit">
                                    <FormattedMessage id="common.save" />
                                </Button>
                            )}
                            {idCustomer !== -1 && (
                                <Button htmlType="button" style={{ marginRight: 10 }} onClick={cancelEdition}>
                                    <FormattedMessage id="common.return.list" />
                                </Button>
                            )}
                            {idCustomer !== -1 && (
                                <Button type="primary" htmlType="submit">
                                    <FormattedMessage id="common.update" />
                                </Button>
                            )}
                        </Col>
                    </Row>
                </div>
                <div className="add-customer-form-items view-right">
                    <Form.Item>
                        {getFieldDecorator(
                            'thumbnail',
                            validators.thumbnail
                        )(<ThumbnailUpload size={144} gender={form.getFieldValue('gender')} />)}
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    phone: state.user.addCustomer.phone,
    pseudo: state.user.addCustomer.pseudo,
    email: state.user.addCustomer.email,
    gender: state.user.addCustomer.gender,
    thumbnail: state.user.addCustomer.thumbnail,
    isActive: state.user.addCustomer.isActive,
    password: state.user.addCustomer.password,
    passwordRepeat: state.user.addCustomer.passwordRepeat,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addCustomerForm',
        mapPropsToFields(props) {
            return {
                phone: Form.createFormField({ value: props.phone }),
                isActive: Form.createFormField({ value: props.isActive }),
                pseudo: Form.createFormField({ value: props.pseudo }),
                email: Form.createFormField({ value: props.email }),
                gender: Form.createFormField({ value: props.gender }),
                thumbnail: Form.createFormField({ value: props.thumbnail }),
                password: Form.createFormField({ value: props.password }),
                passwordRepeat: Form.createFormField({ value: props.passwordRepeat }),
            };
        },
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
