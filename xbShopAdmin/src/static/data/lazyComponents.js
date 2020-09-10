import { lazy } from 'react';

const lazies = {
    dashboard: {
        prefix: 'dashboard',
        routes: [
            {
                key: 'addProduct',
                link: 'addProduct/:idProduct?',
                source: lazy(() => import('../../components/Product/productGenerator/productGenerator')),
            },
            {
                key: 'productList',
                link: 'productList',
                source: lazy(() => import('../../components/Product/productList/productList')),
            },
            {
                key: 'category',
                link: 'category',
                source: lazy(() => import('../../components/Category/category.index')),
            },
            {
                key: 'addCategory',
                link: 'addCategory/:idCat?',
                source: lazy(() => import('../../components/Category/categoryGenerator/categoryGenerator')),
            },
            {
                key: 'userList',
                link: 'userList',
                source: lazy(() => import('../../components/User/UserList/userList')),
            },
            {
                key: 'teamList',
                link: 'teamList',
                source: lazy(() => import('../../components/User/TeamList/teamList')),
            },
        ],
    },
};

export default lazies;
