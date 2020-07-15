import { lazy } from 'react';

const lazies = {
    dashboard: {
        prefix: 'dashboard',
        routes: [
            {
                key: 'product',
                link: 'addProduct',
                source: lazy(() => import('../../components/Product/ProductGenerator/productGenerator')),
            },
            {
                key: 'category',
                link: 'category',
                source: lazy(() => import('../../components/Category/category.index')),
            },
            {
                key: 'addCategory',
                link: 'addCategory',
                source: lazy(() => import('../../components/Category/categoryGenerator/categoryGenerator')),
            },
        ],
    },
};

export default lazies;
