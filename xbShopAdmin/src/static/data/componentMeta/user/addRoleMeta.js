module.exports = {
    roleGenerator: {
        title: 'user.addRole.header.title',
        description: 'user.addRole.header.subtitle',
        formName: 'addRole', // form name
        formLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16, offset: 1 },
            },
        },
        newUpdateMaxAge: 8 * 1, // new or updated signal duration
        newUpdateKey: 'newUserroleId',
    },
};
