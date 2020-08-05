import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';

const { maxGalleries } = productGenerator;

export const _SPEC_STATUS_OK = 1;
/* eslint-disable */
export const _SPEC_STATUS_ERROR_NO_SPEC = _SPEC_STATUS_OK << 1;
export const _SPEC_STATUS_ERROR_UNIQUE_TYPE = _SPEC_STATUS_OK << 2;
export const _SPEC_STATUS_ERROR_UNIQUE_SKU = _SPEC_STATUS_OK << 3;
/* eslint-enable */

// function _translate(intl)
export default ({ intl }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    return {
        productName: {
            rules: [{ required: true, message: _translate('product.add.error.empty.product') }],
        },
        categories: {
            rules: [
                { type: 'array' },
                {
                    validator: (rule, value, callback) => {
                        if (value.length < 1) {
                            callback(_translate('product.add.error.min.category', { nb: 1 }));
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
                            callback(_translate('product.add.error.max.gallery', { maxGalleries: 3 }));
                        } else if (value && value.length === 0) {
                            callback(_translate('product.add.error.min.gallery'));
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
        comment: {
            initialValue: '',
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
                    errorMsg = _translate('product.add.error.min.spec');
                    return { status, errorMsg };
                }
                let checkMap = new Map();
                specs.forEach((item) => checkMap.set(item.sku, item));
                if (checkMap.size < specs.length) {
                    status = _SPEC_STATUS_ERROR_UNIQUE_SKU;
                    errorMsg = _translate('product.add.error.same.sku');
                    return { status, errorMsg };
                }
                checkMap = new Map();
                specs.forEach((item) => checkMap.set(item.specType, item));
                if (checkMap.size < specs.length) {
                    status = _SPEC_STATUS_ERROR_UNIQUE_TYPE;
                    errorMsg = _translate('product.add.error.same.spec');
                    return { status, errorMsg };
                }

                return { status, errorMsg };
            },
            sku: {
                rules: [{ required: true, message: _translate('product.add.error.empty.sku') }],
            },
            specType: {
                rules: [{ required: true, message: _translate('product.add.error.empty.spec') }],
            },
        },
        detailDscp: {
            valuePropName: 'richContent',
        },
    };
};
