import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Form, Button, Switch, Row, Col, Input } from 'antd';
import { injectIntl } from 'react-intl';

import RichTextEditor from '../../../Common/RichTextEditor/richTextEditor';

import { productGenerator } from '../../../../static/data/componentMeta/product/addProductMeta';
import * as ProductActionType from '../../../../store/actionType/productActionType';
import * as ProductActionCreator from '../../../../store/action/productActions';
import getValidators from '../validators';
/**
 * 添加产品第一步
 */
const Core = (props) => {
    const { form, intl, backendStatus, backendMsg } = props;
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const validators = getValidators({ intl });

    useEffect(() => {
        switch (backendStatus) {
            case ProductActionType._EDIT_PRODUCT_SUCCESS:
                return;
            case ProductActionType._EDIT_PRODUCT_FAIL:
                return;
            default:
                return;
        }
    }, [backendStatus]);

    const goPrev = (e) => {
        e.preventDefault();
        dispatch(ProductActionCreator.submitAddProductStep({ currentStep: 0 }));
    };
    const onSubmitStepTwo = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                // dispatch(ProductActionCreator.submitAddProductStep({ ...values, currentStep: 2 }));
                dispatch(ProductActionCreator.saveEditedProduct({ ...values }));
            }
        });
    };

    return (
        <Form onSubmit={onSubmitStepTwo} {...productGenerator.formLayout}>
            <Form.Item label={intl.formatMessage({ id: 'product.add.offShelf' })}>
                {getFieldDecorator(
                    'isOffShelf',
                    validators.isOffShelf
                )(
                    <Switch
                        checkedChildren={intl.formatMessage({ id: 'common.yes' })}
                        unCheckedChildren={intl.formatMessage({ id: 'common.no' })}
                    />
                )}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'common.note' })}>
                {getFieldDecorator('comment')(
                    <Input.TextArea
                        placeholder={intl.formatMessage({ id: 'common.note' })}
                        className="fixed-vert"
                        rows={4}
                    />
                )}
            </Form.Item>
            <Form.Item
                label={intl.formatMessage({ id: 'product.add.detailDscp' })}
                wrapperCol={productGenerator.wrapperColLargeLayout}
            >
                {getFieldDecorator('detailDscp', validators.detailDscp)(<RichTextEditor />)}
            </Form.Item>
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 18, offset: 6 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                        {intl.formatMessage({ id: 'common.click.confirm' })}
                    </Button>
                    <Button type="default" onClick={goPrev}>
                        {intl.formatMessage({ id: 'common.prev.step' })}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    isOffShelf: state.product.addProductReducer.isOffShelf,
    detailDscp: state.product.addProductReducer.detailDscp,
    backendStatus: state.product.addProductReducer.backendStatus,
    backendMsg: state.product.addProductReducer.backendMsg,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addProduct_step_two',
        mapPropsToFields(props) {
            return {
                isOffShelf: Form.createFormField({ value: props.isOffShelf }),
                detailDscp: Form.createFormField({ value: props.detailDscp }),
            };
        },
    })(injectIntl(Core))
);

export default WrappedForm;
