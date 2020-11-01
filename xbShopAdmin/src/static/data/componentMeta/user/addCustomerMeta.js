module.exports = {
    customerGenerator: {
        formName: 'addCustomer', // form name
        formLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15, offset: 1 },
            },
        },
        newUpdateMaxAge: 8 * 1, // new or updated signal duration
        newUpdateKey: 'newAdminId',
        rules: {
            pseudoMinLen: 6,
        },
    },
};
