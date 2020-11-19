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
                access: true,
                link: 'productList',
                source: lazy(() => import('../../components/Product/productList/productList')),
            },
            {
                key: 'category',
                access: true,
                link: 'category',
                source: lazy(() => import('../../components/Category/category.index')),
            },
            {
                key: 'addCategory',
                link: 'addCategory/:idCat?',
                source: lazy(() => import('../../components/Category/categoryGenerator/categoryGenerator')),
            },
            // {
            //     key: 'userList',
            //     access: true,
            //     link: 'userList',
            //     source: lazy(() => import('../../components/User/UserList/userList')),
            // },
            {
                key: 'teamList',
                access: true,
                link: 'teamList',
                source: lazy(() => import('../../components/User/TeamList/teamList')),
            },
            {
                key: 'addAdmin',
                link: 'addAdmin/:idAdmin?',
                source: lazy(() => import('../../components/User/AdminGenerator/adminGenerator')),
            },
            {
                key: 'addRole',
                link: 'addRole/:idRole?',
                source: lazy(() => import('../../components/User/RoleGenerator/roleGenerator')),
            },
            {
                key: 'customerList',
                access: true,
                link: 'customerList',
                source: lazy(() => import('../../components/User/CustomerList/customerList')),
            },
            {
                key: 'addCustomer',
                link: 'addCustomer',
                source: lazy(() => import('../../components/User/CustomerGenerator/customerGenerator')),
            },
        ],
    },
};

export default lazies;
