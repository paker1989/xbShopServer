import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Radio, Row, Col, Button, Switch, Modal } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useUnmount } from 'ahooks';
import { withRouter } from 'react-router-dom';

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
    const { form, intl, history } = props;

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

    const cancelEdition = () => {
        // history.push({
        //     pathname: `/dashboard/addCustomer/2`, // backendMsg = idCustomer
        // });
        // dispatch({ type: CustomerActionType._SET_SELECT_MENU, payload: 'address' });
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
                // message.error(intl.formatMessage({ id: `customer.save.error.${backendMsg}` }));
            }
        }
        dispatch(CustomerActionCreator.resetAddressSaveBackendStatus());
    }, [backendStatus, backendMsg]);

    return (
        <Form onSubmit={onSubmit} className="add-address-form-body">
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.email.mandatory' })}>
                {getFieldDecorator(
                    'email',
                    validators.email
                )(<Input className="xb-form-input" placeholder={intl.formatMessage({ id: 'user.addAdmin.email' })} />)}
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
            {/* <Row>
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
            </Row> */}
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
