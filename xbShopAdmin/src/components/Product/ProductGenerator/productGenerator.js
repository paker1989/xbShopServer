/**
 * 添加，修改商品 Parent form
 * multi-steps form reference from
 * https://github.com/jarnugirdhar/antd-react-multistep-form/blob/master/src/components/FinalForm.js
 */
import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { useUnmount } from 'ahooks';
import { NavLink } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import HLPageMeta from '../../../static/data/componentMeta/product/addProductMeta';
import FormSteps from '../../Common/FormSteps/formSteps';
import AddStepOne from './addStepOne/addStepOne';
import AddStepTwo from './addStepTwo/addStepTwo';
import AddStepThree from './addStepThree/addStepThree';

import * as productActionCreator from '../../../store/action/productActions';

import './productGenerator.scss';

const ProductGenerator = ({ intl }) => {
    const dispatch = useDispatch();
    const currentStep = useSelector((state) => state.product.addProductReducer.currentStep);
    const { description, title, steps } = HLPageMeta.productGenerator;

    useUnmount(() => {
        dispatch(productActionCreator.resetAddProduct());
    });

    const renderFormStep = (step) => {
        switch (step) {
            default:
            case 0:
                return <AddStepOne />;
            case 1:
                return <AddStepTwo />;
            case 2:
                return <AddStepThree />;
        }
    };

    return (
        <div className="product-generator">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary">
                        <NavLink to="/dashboard/productList">
                            {intl.formatMessage({ id: 'common.return.list' })}
                        </NavLink>
                    </Button>
                }
            />
            <div className="product-form-wrapper section-container">
                <Card bordered={false}>
                    <Row>
                        <Col md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
                            <FormSteps activeStep={currentStep} data={steps} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '40px 0' }}>
                        <Col md={{ span: 24 }} lg={{ span: 20, offset: 2 }}>
                            {renderFormStep(currentStep)}
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(ProductGenerator);
