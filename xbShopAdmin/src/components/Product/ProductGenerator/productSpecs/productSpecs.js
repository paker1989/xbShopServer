/**
 * 产品规格
 */
import React, { forwardRef } from 'react';
import { Button, Table } from 'antd';
import './productSpecs.scss';

const ProductSpecs = (props, ref) => {
    return (
        <div className="product-specs">
            <div>
                <Button type="primary">添加规格</Button>
            </div>
            <div></div>
        </div>
    );
};

export default forwardRef(ProductSpecs);
