import LazyComponents from '../static/data/lazyComponents';

const { routes, prefix } = LazyComponents.dashboard;

export function getIndexPage(code) {
    const route = routes.find((item) => item.key === code);
    return route ? `/${prefix}/${route.link}` : '/dashboard/productList';
}
