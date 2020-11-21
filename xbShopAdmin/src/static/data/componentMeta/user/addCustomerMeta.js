module.exports = {
    global: {
        // defaultMenus: ['basic', 'address', 'orders'],
        routes: {
            basic: '',
            address: 'address',
            orders: 'orders',
        },
    },
    customerGenerator: {
        formName: 'addCustomer', // form name
        formLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        },
        newUpdateMaxAge: 8 * 1, // new or updated signal duration
        newUpdateKey: 'newAdminId',
        rules: {
            pseudoMinLen: 3,
        },
        maxOriginFileSize: 2 * 1024 * 1024, // 2M内不压缩
    },
    addAddressGenerator: {
        formName: 'addAddress', // form name
        formRowLayout: {
            xs: { span: 24 },
            sm: { span: 20, offset: 2 },
            md: { span: 18, offset: 2 },
        },
        routes: {
            basic: '',
            add: '/add',
        },
    },
};
