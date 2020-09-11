import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import addAdminMeta from '../../../static/data/componentMeta/user/addAdminMeta';

const { adminGenerator: generatorMeta } = addAdminMeta;

const AdminForm = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                /* eslint-disable */
                const { shortDscp, specs, ...otherValidatedProps } = values;
                /* eslint-disable */
                const { status, errorMsg } = validators.specs.global(specs);

                if (status !== _SPEC_STATUS_OK) {
                    message.error(errorMsg);
                    return;
                }

                disptch(
                    ProductActionCreator.submitAddProductStep({
                        shortDscp: getNoEmptyStr(shortDscp),
                        specs,
                        ...otherValidatedProps,
                        currentStep: 1,
                    })
                );
            }
        });
    };

    return (
        <Form onSubmit={onSubmit} {...productGenerator.formLayout}>
            <Form.Item label={intl.formatMessage({ id: 'product.name.mandatory' })}>
                {getFieldDecorator(
                    'productName',
                    validators.productName
                )(<Input placeholder={intl.formatMessage({ id: 'product.name' })} />)}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'product.shortdscp.optional' })}>
                {getFieldDecorator('shortDscp')(
                    <Input.TextArea
                        placeholder={intl.formatMessage({ id: 'product.shortdscp' })}
                        className="fixed-vert"
                        rows={4}
                    />
                )}
            </Form.Item>
            <Form.Item
                label={intl.formatMessage({ id: 'product.category' })}
                extra={intl.formatMessage({ id: 'product.category.tooltip' })}
            >
                {getFieldDecorator(
                    'categories',
                    validators.categories
                )(
                    <Select mode="multiple" placeholder={intl.formatMessage({ id: 'product.category' })}>
                        {categoryList
                            .filter((item) => item.isActive && !item.isDeleted)
                            .map((item) => (
                                <Option key={item.idCategory} value={item.idCategory}>
                                    {item.label}
                                </Option>
                            ))}
                    </Select>
                )}
            </Form.Item>
            <Form.Item
                label={intl.formatMessage({ id: 'product.gallery' })}
                extra={intl.formatMessage({ id: 'product.gallery.tooltip' })}
            >
                {getFieldDecorator('galleries', validators.galleries)(<GalleryUpload />)}
            </Form.Item>
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 5 }} style={{ textAlign: 'right' }}>
                    <FormattedMessage id="product.spec" />
                </Col>
                <Col {...productGenerator.wrapperColLargeLayout}>
                    <ProductSpecs form={form} specs={specs} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 0 }} sm={{ span: 5 }}></Col>
                <Col {...productGenerator.wrapperColLargeLayout}>
                    <Button type="primary" htmlType="submit">
                        <FormattedMessage id="common.next" />
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: generatorMeta.formName,
        mapPropsToFields(props) {
            return {
                productName: Form.createFormField({ value: props.productName }),
                shortDscp: Form.createFormField({ value: props.shortDscp }),
                categories: Form.createFormField({ value: props.categories }),
                galleries: Form.createFormField({ value: props.galleries }),
                specs: Form.createFormField({ value: props.specs }),
            };
        },
    })(injectIntl(Core))
);

export default WrappedForm;
