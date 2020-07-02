/**
 * 添加，修改商品 Parent form
 */
import React from 'react';
import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import { Card } from 'antd';

import HLPageMeta from '../../../static/data/componentMeta/HighLightHeaderMeta';

import './productGenerator.scss';

const ProductGenerator = () => {
    return (
        <div className="product-generator">
            <HLPageHeader {...HLPageMeta.productGenerator} />
            <div className="product-form-wrapper section-container">
                <Card bordered={false}>product generator</Card>
            </div>
        </div>
    );
};

export default ProductGenerator;
