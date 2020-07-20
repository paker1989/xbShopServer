module.exports = [
    {
        title: 'menu.dashboard',
        key: 'db',
        type: 'item',
        icon: {
            type: 'native',
            name: 'dashboard',
        },
        link: '/',
    },
    {
        title: 'menu.product',
        key: 'product',
        type: 'subMenu',
        icon: {
            type: 'native',
            name: 'radar-chart',
        },
        children: [
            {
                title: 'menu.product.list',
                key: 'prdList',
                type: 'item',
                icon: {
                    type: 'native',
                    name: 'unordered-list',
                },
                link: '/dashboard/productList',
            },
        ],
    },
    {
        title: 'menu.category',
        key: 'cat',
        type: 'item',
        icon: {
            type: 'native',
            name: 'appstore',
        },
        link: '/dashboard/category',
    },
];
