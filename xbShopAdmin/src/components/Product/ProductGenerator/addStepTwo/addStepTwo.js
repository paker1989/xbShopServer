import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Form, Button, Switch, Row, Col, Input } from 'antd';

import RichTextEditor from '../../../Common/RichTextEditor/richTextEditor';

import { productGenerator } from '../../../../static/data/componentMeta/product/addProductMeta';
import * as ProductActionCreator from '../../../../store/action/productActions';
import validators from '../validators';
/**
 * 添加产品第一步
 */
const Core = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const disptch = useDispatch();

    const goPrev = (e) => {
        e.preventDefault();
        disptch(ProductActionCreator.goAddProductTargetStep(0));
    };
    const onSubmitStepTwo = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                disptch(ProductActionCreator.submitAddProductStep({ ...values }));
            }
        });
    };

    return (
        <Form onSubmit={onSubmitStepTwo} {...productGenerator.formLayout}>
            <Form.Item label="是否暂时下架">
                {getFieldDecorator(
                    'isOffShelf',
                    validators.isOffShelf
                )(<Switch checkedChildren="是" unCheckedChildren="否" />)}
            </Form.Item>
            <Form.Item label="备注">
                {getFieldDecorator('comment')(<Input.TextArea placeholder="备注" className="fixed-vert" rows={4} />)}
            </Form.Item>
            <Form.Item label="商品详情" wrapperCol={productGenerator.wrapperColLargeLayout}>
                {getFieldDecorator('detailDscp', validators.detailDscp)(<RichTextEditor />)}
            </Form.Item>
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 18, offset: 5 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                        点击以确认
                    </Button>
                    <Button type="default" onClick={goPrev}>
                        返回上一步
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    isOffShelf: state.product.addProductReducer.isOffShelf,
    detailDscp: state.product.addProductReducer.detailDscp,
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
    })(Core)
);

export default WrappedForm;
