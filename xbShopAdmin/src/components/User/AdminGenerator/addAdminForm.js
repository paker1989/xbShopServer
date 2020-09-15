import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Row, Col, Switch } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import PasswordConfirmer from '../../Common/PasswordConfirmer/pwdConfirmer';
import addAdminMeta from '../../../static/data/componentMeta/user/addAdminMeta';
import getValidators from './validators';

const { adminGenerator: generatorMeta } = addAdminMeta;
const { Option } = Select;

const AdminForm = (props) => {
    const { form, intl } = props;
    const { getFieldDecorator } = form;
    const validators = getValidators({ intl, form });

    const [editMode, setEditMode] = useState(false);

    const cancelEdition = () => {};

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                // /* eslint-disable */
                // const { shortDscp, specs, ...otherValidatedProps } = values;
                // /* eslint-disable */
                // const { status, errorMsg } = validators.specs.global(specs);
                // if (status !== _SPEC_STATUS_OK) {
                //     message.error(errorMsg);
                //     return;
                // }
                // disptch(
                //     ProductActionCreator.submitAddProductStep({
                //         shortDscp: getNoEmptyStr(shortDscp),
                //         specs,
                //         ...otherValidatedProps,
                //         currentStep: 1,
                //     })
                // );
            }
        });
    };

    return (
        <Form onSubmit={onSubmit} {...generatorMeta.formLayout}>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.email.mandatory' })}>
                {getFieldDecorator(
                    'email',
                    validators.email
                )(<Input style={{ width: 250 }} placeholder={intl.formatMessage({ id: 'user.addAdmin.email' })} />)}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'common.phone' })}>
                {getFieldDecorator(
                    'phone',
                    validators.phoneNumber
                )(<Input style={{ width: 250 }} placeholder={intl.formatMessage({ id: 'common.phone' })} />)}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.yourRole' })}>
                {getFieldDecorator(
                    'role',
                    validators.idRole
                )(
                    <Select
                        style={{ width: 250 }}
                        placeholder={intl.formatMessage({ id: 'user.addAdmin.placeholder.role' })}
                    >
                        <Option value={1}>超级管理员</Option>
                        <Option value={2}>物流管理员</Option>
                    </Select>
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'user.addAdmin.defaultPage' })}>
                {getFieldDecorator(
                    'defaultPage',
                    validators.defaultPage
                )(
                    <Select
                        disabled
                        style={{ width: 250 }}
                        placeholder={intl.formatMessage({ id: 'user.addAdmin.placeholder.defaultPage' })}
                    >
                        <Option value={1}>超级管理员</Option>
                        <Option value={2}>物流管理员</Option>
                    </Select>
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
            {/* <Form.Item wrapperCol={24}>
                {getFieldDecorator(
                    'password',
                    validators.password
                )(<PasswordConfirmer isRepeat={editMode === false} showGenerate form={form} validators={validators} />)}
            </Form.Item> */}
            <PasswordConfirmer isRepeat={editMode === false} showGenerate form={form} validators={validators} />
            <Row>
                <Col xs={{ span: 0 }} sm={{ span: 5 }}></Col>
                <Col {...generatorMeta.wrapperColLargeLayout}>
                    <Button htmlType="button" style={{ marginRight: 10 }} onClick={cancelEdition}>
                        <FormattedMessage id="common.cancel" />
                    </Button>
                    <Button type="primary" htmlType="submit">
                        <FormattedMessage id="common.confirm.back" />
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    // productName: state.product.addProductReducer.productName,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: generatorMeta.formName,
        mapPropsToFields(props) {
            return {
                // productName: Form.createFormField({ value: props.productName }),
            };
        },
    })(injectIntl(AdminForm))
);

export default WrappedForm;
