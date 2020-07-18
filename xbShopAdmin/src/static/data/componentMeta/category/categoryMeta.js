module.exports = {
    homeCategory: {
        title: 'cat.home.header.title',
        description: 'cat.home.header.subtitle',
        layout: {
            table: {
                md: { span: 24 },
                lg: { span: 20, offset: 2 },
            },
        },
    },
    addCategory: {
        title: 'cat.add.header.title',
        description: 'cat.add.header.subtitle',
        layout: {
            formWrapper: {
                md: { span: 24 },
                lg: { span: 18, offset: 2 },
            },
            formLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 10, offset: 1 },
                },
            },
            buttonRow: {
                xs: { span: 24 },
                sm: { span: 18, offset: 6 },
            },
        },
    },
};
