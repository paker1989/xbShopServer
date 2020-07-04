/**
 * 添加，修改商品 Parent form
 * multi-steps form reference from
 * https://github.com/jarnugirdhar/antd-react-multistep-form/blob/master/src/components/FinalForm.js
 */
import React from 'react';
import { Card, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import HLPageMeta from '../../../static/data/componentMeta/product/addProductMeta';
import FormSteps from '../../Common/FormSteps/formSteps';
import AddStepOne from './addStepOne/addStepOne';
import AddStepTwo from './addStepTwo/addStepTwo';

// import GalleryUpload from './galleryUpload/galleryUpload';

import './productGenerator.scss';

const ProductGenerator = () => {
    const currentStep = useSelector((state) => state.product.addProductReducer.currentStep);
    const { description, title, steps } = HLPageMeta.productGenerator;

    const renderFormStep = (step) => {
        switch (step) {
            case 0:
                return <AddStepOne />;
            case 1:
                return <AddStepTwo />;
            default:
                return <div></div>;
        }
    };

    return (
        <div className="product-generator">
            <HLPageHeader title={title} description={description} />
            {/* <GalleryUpload /> */}
            <div className="product-form-wrapper section-container">
                <Card bordered={false}>
                    <Row>
                        <Col md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
                            <FormSteps activeStep={currentStep} data={steps} />
                        </Col>
                    </Row>
                    <Row gutter={[0, 80]}>
                        <Col md={{ span: 16, offset: 4 }} lg={{ span: 12, offset: 6 }}>
                            {renderFormStep(currentStep)}
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default ProductGenerator;
