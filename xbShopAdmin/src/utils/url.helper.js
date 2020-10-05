/* eslint-disable */
import LazyComponents from '../static/data/lazyComponents';
/* eslint-enable */

const { routes, prefix } = LazyComponents.dashboard;

export function getIndexPage(code) {
    const route = routes.find((item) => item.key === code);
    return route ? `/${prefix}/${route.link}` : '/dashboard/productList';
}
