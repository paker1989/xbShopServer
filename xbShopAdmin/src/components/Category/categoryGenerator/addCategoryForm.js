import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Form, Button, Switch, Row, Col, Input } from 'antd';
import { injectIntl } from 'react-intl';
import { useUnmount } from 'ahooks';
import { NavLink } from 'react-router-dom';

import { addCategory as addCategoryMeta } from '../../../static/data/componentMeta/category/categoryMeta';
import * as CategoryActionCreator from '../../../store/action/categoryActions';
import getValidators from './validators';

const { layout } = addCategoryMeta;

const Core = (props) => {
    const { form, intl } = props;
    const { getFieldDecorator } = form;
    const disptch = useDispatch();
    const validators = getValidators({ intl });

    useUnmount(() => {
        disptch(CategoryActionCreator.cancelEditCategories());
    });

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                disptch(CategoryActionCreator.submitAddProductStep({ ...values, currentStep: 2 }));
            }
        });
    };

    // const cancelEdition = (e) => {
    //     e.preventDefault();
    // };

    return (
        <Form onSubmit={onSubmit} {...layout.formLayout}>
            <Form.Item label={intl.formatMessage({ id: 'cat.name.mandatory' })}>
                {getFieldDecorator(
                    'categoryName',
                    validators.categoryName
                )(<Input placeholder={intl.formatMessage({ id: 'cat.name' })} />)}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'cat.active' })}>
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
            <Row>
                <Col {...layout.buttonRow}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                        {intl.formatMessage({ id: 'common.click.confirm' })}
                    </Button>
                    <NavLink to="/dashboard/category">
                        <Button type="default">{intl.formatMessage({ id: 'common.cancel' })}</Button>
                    </NavLink>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    categoryName: state.categoryReducer.editionStatus.name,
    isActive: state.categoryReducer.editionStatus.isActive,
    parentId: state.categoryReducer.editionStatus.parentId,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addCategoryForm',
        mapPropsToFields(props) {
            return {
                categoryName: Form.createFormField({ value: props.categoryName }),
                isActive: Form.createFormField({ value: props.isActive }),
                parentId: Form.createFormField({ value: props.parentId }),
            };
        },
    })(injectIntl(Core))
);

export default WrappedForm;
