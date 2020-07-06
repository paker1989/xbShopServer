import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';

const { maxGalleries } = productGenerator;

export const _SPEC_STATUS_OK = 1;
/* eslint-disable */
export const _SPEC_STATUS_ERROR_NO_SPEC = _SPEC_STATUS_OK << 1;
export const _SPEC_STATUS_ERROR_UNIQUE_TYPE = _SPEC_STATUS_OK << 2;
export const _SPEC_STATUS_ERROR_UNIQUE_SKU = _SPEC_STATUS_OK << 3;
/* eslint-enable */

export default {
    productName: {
        rules: [{ required: true, message: '产品名称不能为空' }],
    },
    categories: {
        rules: [
            { type: 'array' },
            {
                validator: (rule, value, callback) => {
                    if (value.length < 1) {
                        callback('请您至少选择一个分类');
                    } else {
                        callback();
                    }
                },
            },
        ],
    },
    galleries: {
        valuePropName: 'galleries',
        initialValue: [],
        rules: [
            {
                validator: (rule, value, callback) => {
                    if (value && value.length > maxGalleries) {
                        callback(`您最多可以选择${maxGalleries}张图片`);
                    } else if (value && value.length === 0) {
                        callback(`您必须至少选择一张图片`);
                    } else {
                        callback();
                    }
                },
            },
        ],
    },
    isOffShelf: {
        valuePropName: 'checked',
    },
    specs: {
        /**
         * global check on specs
         */
        global: (specs) => {
            let status = _SPEC_STATUS_OK;
            let errorMsg = '';

            if (typeof specs === 'undefined' || specs.length === 0) {
                status = _SPEC_STATUS_ERROR_NO_SPEC;
                errorMsg = '请至少添加一个规格/型号';
                return { status, errorMsg };
            }
            let checkMap = new Map();
            specs.forEach((item) => checkMap.set(item.sku, item));
            if (checkMap.size < specs.length) {
                status = _SPEC_STATUS_ERROR_UNIQUE_SKU;
                errorMsg = '请不要输入相同的商品sku';
                return { status, errorMsg };
            }
            checkMap = new Map();
            specs.forEach((item) => checkMap.set(item.specType, item));
            if (checkMap.size < specs.length) {
                status = _SPEC_STATUS_ERROR_UNIQUE_TYPE;
                errorMsg = '请不要输入相同的型号/规格';
                return { status, errorMsg };
            }

            return { status, errorMsg };
        },
        sku: {
            rules: [{ required: true, message: 'sku不能为空' }],
        },
        specType: {
            rules: [{ required: true, message: '型号/规格不能为空' }],
        },
    },
    detailDscp: {
        valuePropName: 'richContent',
    },
};
