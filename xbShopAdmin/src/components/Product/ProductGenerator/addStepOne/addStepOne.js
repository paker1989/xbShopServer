import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, Row, Col } from 'antd';

import ProductSpecs from '../productSpecs/productSpecs';
import GalleryUpload from '../galleryUpload/galleryUpload';

import { getNoEmptyStr } from '../../../../utils/data.helper';
import * as ProductActionCreator from '../../../../store/action/productActions';
import * as CategoryActionCreator from '../../../../store/action/categoryActions';
import { productGenerator } from '../../../../static/data/componentMeta/product/addProductMeta';
import validators from '../validators';

import './addStepOne.scss';

const { Option } = Select;
/**
 * 添加产品第一步
 */
const Core = (props) => {
    const { form, specs } = props;
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
                {getFieldDecorator('productName', validators.productName)(<Input placeholder="产品名称" />)}
            </Form.Item>
            <Form.Item label="简短描述(选填)">
                {getFieldDecorator('shortDscp')(
                    <Input.TextArea placeholder="简短说明" className="fixed-vert" rows={4} />
                )}
            </Form.Item>
            <Form.Item label="分类" extra="至少选择一个">
                {getFieldDecorator(
                    'categories',
                    validators.categories
                )(
                    <Select mode="multiple" placeholder="请选择分类">
                        {categoryList
                            .filter((item) => item.isActive && !item.isDeleted)
                            .map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.label}
                                </Option>
                            ))}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="产品图片" extra="最少一张，最多3张，只支持jpg/png">
                {getFieldDecorator('galleries', validators.galleries)(<GalleryUpload />)}
            </Form.Item>
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 4 }}>
                    产品规格
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 19, offset: 1 }}>
                    <ProductSpecs form={form} specs={specs} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 0 }} sm={{ span: 4 }}></Col>
                <Col xs={{ span: 24 }} sm={{ span: 12, offset: 1 }}>
                    <Button type="primary" htmlType="submit">
                        下一步
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = (state) => ({
    productName: state.product.addProductReducer.productName,
    shortDscp: state.product.addProductReducer.shortDscp,
    categories: state.product.addProductReducer.categories,
    galleries: state.product.addProductReducer.galleries,
    specs: state.product.addProductReducer.specs,
});

const WrappedForm = connect(mapStateToProps)(
    Form.create({
        name: 'addProduct_step_one',
        mapPropsToFields(props) {
            return {
                productName: Form.createFormField({ value: props.productName }),
                shortDscp: Form.createFormField({ value: props.shortDscp }),
                categories: Form.createFormField({ value: props.categories }),
                galleries: Form.createFormField({ value: props.galleries }),
                specs: Form.createFormField({ value: props.specs }),
            };
        },
    })(Core)
);

export default WrappedForm;
