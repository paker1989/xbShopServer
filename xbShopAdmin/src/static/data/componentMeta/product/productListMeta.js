module.exports = {
    title: 'product.list.header.title',
    description: 'product.list.header.subtitle',
    layout: {
        table: {
            md: { span: 24 },
            lg: { span: 22, offset: 1 },
        },
    },
    pageSize: 1, // 20
    nbPageFetched: 3, // 每次fetch的时候fetch{{nbPageFetched}}页
};
