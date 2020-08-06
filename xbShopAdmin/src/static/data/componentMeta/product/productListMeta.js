module.exports = {
    title: 'product.list.header.title',
    description: 'product.list.header.subtitle',
    layout: {
        table: {
            md: { span: 24 },
            lg: { span: 22, offset: 1 },
        },
    },
    pageSize: 20,
    nbSiblingFetched: 1, // 每次fetch的时候fetch前后{{nbSiblingFetched}}个page
};
