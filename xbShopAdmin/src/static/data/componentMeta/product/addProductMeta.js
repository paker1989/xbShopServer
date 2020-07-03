module.exports = {
    productGenerator: {
        title: '增加, 修改您的产品',
        description: '完成添加或者修改后，点击保存或者取消完成当前修改。产品将在列表中更新',
        formName: 'addProduct', // form name
        steps: [{ title: '产品基本信息' }, { title: '商城显示选项' }, { title: ' 完成' }],
        formLayout: {
            // add product form lay out
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 17, offset: 1 },
            },
        },
    },
};
