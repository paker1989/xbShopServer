export default function getValidators(props) {
    return {
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
    };
}
