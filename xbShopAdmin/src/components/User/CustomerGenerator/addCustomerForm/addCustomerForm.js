import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Radio, Row, Col, Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { useUnmount } from 'ahooks';
import { NavLink, withRouter } from 'react-router-dom';

import { customerGenerator as addCustomerMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
import getValidators from './validators';

import ThumbnailUpload from '../../../Common/ThumbnailUpload/thumbnailUpload';

import './addCustomerForm.scss';

const { formLayout } = addCustomerMeta;

const Core = (props) => {
    const dispatch = useDispatch();
    const { form, intl, history, match } = props;

    const idCustomer = parseInt(match.params.idCustomer || -1, 10);

    const { getFieldDecorator } = form;
    const validators = getValidators({ intl, form });

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                dispatch(CustomerActionCreator.saveCustomer({ idCustomer, ...values }));
            }
        });
    };

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

                <Row>
                    <Col {...formLayout.labelCol}></Col>
                    <Col {...formLayout.wrapperCol}>
                        {idCustomer === -1 && (
                            <Button htmlType="button" style={{ marginRight: 10 }}>
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
                <ThumbnailUpload size={144} gender="f" />
            </div>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    // categoryName: state.categoryReducer.editionFields.label,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addCustomerForm',
        mapPropsToFields(props) {
            return {
                // categoryName: Form.createFormField({ value: props.categoryName }),
            };
        },
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
