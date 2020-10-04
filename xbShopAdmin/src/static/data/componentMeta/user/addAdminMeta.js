module.exports = {
    adminGenerator: {
        title: 'user.addAdmin.header.title',
        description: 'user.addAdmin.header.subtitle',
        formName: 'addAdmin', // form name
        formLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14, offset: 1 },
            },
        },
        pwdLength: 6,
    },
};
