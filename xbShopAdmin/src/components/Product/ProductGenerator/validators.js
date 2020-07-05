import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';

const { maxGalleries } = productGenerator;

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
        sku: {
            rules: [{ required: true, message: 'sku不能为空' }],
        },
    },
};
