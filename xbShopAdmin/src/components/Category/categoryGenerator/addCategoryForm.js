import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Button, Switch, Row, Col, Input, message } from 'antd';
import { injectIntl } from 'react-intl';
import { useUnmount } from 'ahooks';
import { NavLink, withRouter } from 'react-router-dom';

import { addCategory as addCategoryMeta } from '../../../static/data/componentMeta/category/categoryMeta';
import * as CategoryActionType from '../../../store/actionType/categoryActionType';
import * as CategoryActionCreator from '../../../store/action/categoryActions';
import getValidators from './validators';

const { layout } = addCategoryMeta;

const Core = (props) => {
    const { form, intl, history, match } = props;
    const [loading, setLoading] = useState(false);

    const isInited = useSelector((state) => state.categoryReducer.isInited);
    const categoryList = useSelector((state) => state.categoryReducer.categories);
    const backendStatus = useSelector((state) => state.categoryReducer.backendStatus);
    const backendMsg = useSelector((state) => state.categoryReducer.backendMsg);

    const dispatch = useDispatch();

    const { getFieldDecorator } = form;
    const { idCat = '-1' } = match.params;

    const validators = getValidators({ intl, categoryList, idCat });

    useEffect(() => {
        // case: 直接hit this url for edit
        if (isInited === false) {
            dispatch(CategoryActionCreator.getCategories({}));
        } else if (idCat !== '-1') {
            dispatch(CategoryActionCreator.editCategory(Number.parseInt(idCat, 10)));
        }
    }, [isInited, idCat]);

    useUnmount(() => {
        dispatch(CategoryActionCreator.cancelEditCategories());
    });

    useEffect(() => {
        if (backendStatus === CategoryActionType._EDIT_CATEGORY_SUCCESS) {
            history.push('/dashboard/category');
        } else if (backendStatus === CategoryActionType._EDIT_CATEGORY_FAIL) {
            dispatch(CategoryActionCreator.resetAddCategoryStatus()); // reset backend status
            message.error(backendMsg);
            setLoading(false);
        }
    }, [backendStatus]);

    const onSubmit = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                setLoading(true);
                dispatch(CategoryActionCreator.updateCategory({ ...values, idCategory: idCat }));
            }
        });
    };

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
    categoryName: state.categoryReducer.editionFields.label,
    isActive: state.categoryReducer.editionFields.isActive,
    parentId: state.categoryReducer.editionFields.parentId,
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
