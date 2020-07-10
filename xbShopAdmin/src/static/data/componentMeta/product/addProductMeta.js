module.exports = {
    productGenerator: {
        title: 'product.add.header.title',
        description: 'product.add.header.subtitle',
        formName: 'addProduct', // form name
        steps: [{ title: 'product.step.one' }, { title: 'product.step.two' }, { title: 'product.step.three' }],
        formLayout: {
            // add product form lay out
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10, offset: 1 },
            },
        },
        wrapperColLargeLayout: {
            xs: { span: 24 },
            sm: { span: 18, offset: 1 },
        },
        stepThreeLayout: {
            md: { span: 18, offset: 2 },
            lg: { span: 16, offset: 4 },
            xl: { span: 12, offset: 6 },
        },
        maxGalleries: 3,
        maxOriginFileSize: 2 * 1024 * 1024, // 2M内不压缩
    },
};
