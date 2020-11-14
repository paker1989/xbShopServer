import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Radio, Row, Col, Button, message, Switch, Modal } from 'antd';
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

import './addCustomerForm.scss';

const { formLayout } = addCustomerMeta;
const { confirm } = Modal;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl, history, match } = props;

    // console.log(history);
    const backendStatus = useSelector((state) => state.user.addCustomer.backendStatus);
    const backendMsg = useSelector((state) => state.user.addCustomer.backendMsg);

    const idCustomer = parseInt(match.params.idCustomer || -1, 10);
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
                }
                dispatch(CustomerActionCreator.saveCustomer({ idCustomer, ...values }));
            }
            /* eslint-enable */
        });
    };

    const cancelEdition = () => {
        // history.push('/dashboard/customerList');
        history.push({
            pathname: `/dashboard/addCustomer/2`, // backendMsg = idCustomer
        });
        dispatch({ type: CustomerActionType._SET_SELECT_MENU, payload: 'address' });
    };

    useUnmount(() => {
        CustomerActionCreator.resetCustomerSaveBackendStatus();
    });

    // handle save status
    useEffect(() => {
        if (backendStatus.length === 0) {
            return;
        }
        if (backendStatus === CustomerActionType._CUSTOMER_SAVE_SUCCESS) {
            if (idCustomer === -1) {
                confirm({
                    title: intl.formatMessage({ id: 'customer.confirm.addaddress.title' }),
                    cancelText: intl.formatMessage({ id: 'customer.confirm.addaddress.cancel' }),
                    okText: intl.formatMessage({ id: 'customer.confirm.addaddress.confirm' }),
                    onOk() {
                        history.push({
                            pathname: `/dashboard/addCustomer/${backendMsg}`, // backendMsg = idCustomer
                        });
                        dispatch({ type: CustomerActionType._SET_SELECT_MENU, payload: 'address' });
                    },
                    onCancel() {
                        history.push('/dashboard/customerList');
                    },
                });
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
                    )(<Input className="xb-form-input" placeholder={intl.formatMessage({ id: 'common.pseudo' })} />)}
                </Form.Item>
                <Form.Item label={intl.formatMessage({ id: 'common.gender' })}>
                    {getFieldDecorator(
                        'gender',
                        validators.gender
                    )(
                        <Radio.Group>
                            <Radio.Button value="m">
                                <FormattedMessage id="common.male" />
                            </Radio.Button>
                            <Radio.Button value="f">
                                <FormattedMessage id="common.female" />
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
                <PasswordConfirmer showGenerate initMode={idCustomer === -1 ? 'create' : 'standby'} form={form} />
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
                                <FormattedMessage id="common.confirm.back" />
                            </Button>
                        )}
                        {idCustomer !== -1 && (
                            <Button type="primary" htmlType="submit">
                                <FormattedMessage id="common.confirm.back" />
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
                // categoryName: Form.createFormField({ value: props.categoryName }),
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
