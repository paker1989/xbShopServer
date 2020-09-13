module.exports = {
    adminGenerator: {
        title: 'user.addAdmin.header.title',
        description: 'user.addAdmin.header.subtitle',
        formName: 'addAdmin', // form name
        formLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15, offset: 1 },
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
    },
};
