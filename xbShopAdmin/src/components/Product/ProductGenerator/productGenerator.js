/**
 * 添加，修改商品 Parent form
 * multi-steps form reference from
 * https://github.com/jarnugirdhar/antd-react-multistep-form/blob/master/src/components/FinalForm.js
 */
import React from 'react';
import { Card, Row, Col, Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { useUnmount } from 'ahooks';
import { withRouter } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import HLPageMeta from '../../../static/data/componentMeta/product/addProductMeta';
import FormSteps from '../../Common/FormSteps/formSteps';
import AddStepOne from './addStepOne/addStepOne';
import AddStepTwo from './addStepTwo/addStepTwo';
import AddStepThree from './addStepThree/addStepThree';

import * as productActionCreator from '../../../store/action/productActions';

import './productGenerator.scss';

const ProductGenerator = ({ intl, history }) => {
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

    const returnToList = (e) => {
        e.preventDefault();
        if (currentStep === 2) {
            // no need to confirm when edition is finished
            history.push('/dashboard/productList');
        } else {
            Modal.confirm({
                title: intl.formatMessage({ id: 'product.list.cancel.edition' }),
                okText: intl.formatMessage({ id: 'common.yes' }),
                cancelText: intl.formatMessage({ id: 'common.cancel' }),
                onOk: () => {
                    history.push('/dashboard/productList');
                },
            });
        }
    };

    return (
        <div className="product-generator">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary" onClick={returnToList}>
                        {/* <NavLink to="/dashboard/productList"> */}
                        {intl.formatMessage({ id: 'common.return.list' })}
                        {/* </NavLink> */}
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

export default withRouter(injectIntl(ProductGenerator));
