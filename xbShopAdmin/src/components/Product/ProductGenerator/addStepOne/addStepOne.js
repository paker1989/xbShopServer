import React from 'react';
import { connect } from 'react-redux';

import { Form, Input } from 'antd';
import { cps } from 'redux-saga/effects';

/**
 * 添加产品第一步
 */
const Core = (props) => {
    const { onSubmitStep, form } = props;
    // console.log('core props');
    // console.log(props);
    const { getFieldDecorator } = form;
    return (
        <Form layout="horizontal" onSubmit={onSubmitStep}>
            <Form.Item label="产品名称">
                {getFieldDecorator('productName', {
                    rules: [{ required: true, message: 'product name is required!' }],
                })(<Input placeholder="产品名称" />)}
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    productName: state.product.addProductReducer.productName,
});

export default connect(mapStateToProps)(
    Form.create({
        name: 'addProduct_step_one',
        onFieldsChange(props, changedFields) {
            console.log(changedFields);
        },
        mapPropsToFields(props) {
            return {
                productName: Form.createFormField({ value: props.productName }),
            };
        },
    })(Core)
);
