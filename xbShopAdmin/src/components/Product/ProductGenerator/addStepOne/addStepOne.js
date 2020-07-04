import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';

import { getNoEmptyStr } from '../../../../utils/data.helper';
import * as ProductActionCreator from '../../../../store/action/productActions';
import * as CategoryActionCreator from '../../../../store/action/categoryActions';

import { productGenerator } from '../../../../static/data/componentMeta/product/addProductMeta';

import './addStepOne.scss';

const { Option } = Select;
/**
 * 添加产品第一步
 */
const Core = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const disptch = useDispatch();
    const categoryList = useSelector((state) => state.categoryReducer.categories);
    const isCatInited = useSelector((state) => state.categoryReducer.isInited);

    useEffect(() => {
        if (isCatInited === false) {
            disptch(CategoryActionCreator.getCategories({}));
        }
    }, []);

    const onSubmitStepOne = (e) => {
        e.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                const { shortDscp, ...otherValidatedProps } = values;
                disptch(
                    ProductActionCreator.submitAddProductStepOne({
                        shortDscp: getNoEmptyStr(shortDscp),
                        ...otherValidatedProps,
                    })
                );
            }
        });
    };

    return (
        <Form onSubmit={onSubmitStepOne} {...productGenerator.formLayout}>
            <Form.Item label="产品名称(必填)">
                {getFieldDecorator('productName', {
                    rules: [{ required: true, message: '产品名称不能为空' }],
                })(<Input placeholder="产品名称" />)}
            </Form.Item>
            <Form.Item label="简短描述(选填)">
                {getFieldDecorator('shortDscp')(
                    <Input.TextArea placeholder="简短说明" className="fixed-vert" rows={4} />
                )}
            </Form.Item>
            <Form.Item label="分类" extra="至少选择一个">
                {getFieldDecorator('categories')(
                    <Select mode="multiple" placeholder="请选择分类">
                        {categoryList
                            .filter((item) => item.isActive && !item.isDeleted)
                            .map((item) => (
                                <Option key={item.id}>{item.label}</Option>
                            ))}
                    </Select>
                )}
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                下一步
            </Button>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    productName: state.product.addProductReducer.productName,
    shortDscp: state.product.addProductReducer.shortDscp,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addProduct_step_one',
        mapPropsToFields(props) {
            return {
                productName: Form.createFormField({ value: props.productName }),
                shortDscp: Form.createFormField({ value: props.shortDscp }),
            };
        },
    })(Core)
);

export default WrappedForm;
