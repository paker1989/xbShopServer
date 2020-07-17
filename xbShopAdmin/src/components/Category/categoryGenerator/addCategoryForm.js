import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Form, Button, Switch, Row, Col, Input, message } from 'antd';
import { injectIntl } from 'react-intl';
import { useUnmount } from 'ahooks';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { addCategory as addCategoryMeta } from '../../../static/data/componentMeta/category/categoryMeta';
import * as CategoryActionType from '../../../store/actionType/categoryActionType';
import * as CategoryActionCreator from '../../../store/action/categoryActions';
import getValidators from './validators';

const { layout } = addCategoryMeta;

const Core = (props) => {
    const { form, intl, backendStatus, backendMsg, history } = props;
    const [loading, setLoading] = useState(false);
    const { getFieldDecorator } = form;
    const disptch = useDispatch();
    const validators = getValidators({ intl });

    useUnmount(() => {
        disptch(CategoryActionCreator.cancelEditCategories());
    });

    useEffect(() => {
        if (backendStatus === CategoryActionType._EDIT_CATEGORY_SUCCESS) {
            history.push('/dashboard/category');
        } else if (backendStatus === CategoryActionType._EDIT_CATEGORY_FAIL) {
            message.error(backendMsg);
            setLoading(false);
        }
    }, [backendStatus]);

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                setLoading(true);
                disptch(CategoryActionCreator.updateCategories({ ...values }));
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
                    <Button type="primary" htmlType="submit" style={{ marginRight: 20 }} loading={loading}>
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
    categoryName: state.categoryReducer.editionFields.name,
    isActive: state.categoryReducer.editionFields.isActive,
    parentId: state.categoryReducer.editionFields.parentId,
    backendStatus: state.categoryReducer.backendStatus,
    backendMsg: state.categoryReducer.backendMsg,
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
    })(withRouter(injectIntl(Core)))
);

export default WrappedForm;
