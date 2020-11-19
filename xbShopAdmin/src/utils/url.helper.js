/* eslint-disable */
import LazyComponents from '../static/data/lazyComponents';
/* eslint-enable */

const { routes, prefix } = LazyComponents.dashboard;

export function getIndexPage(code) {
    const route = routes.find((item) => item.key === code);
    return route ? `/${prefix}/${route.link}` : '/dashboard/productList';
}

/* eslint-disable */
export function getUrlParameter(name) {
    const _name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + _name + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
