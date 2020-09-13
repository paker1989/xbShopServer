/**
 *  put all data convert util function here
 */
import { pageSize } from '../static/data/componentMeta/product/productListMeta';

export function getNoEmptyStr(val) {
    return typeof val === 'undefined' || val === null ? '' : val.trim();
}

export function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

export function validePassword(password) {
    const error = '';
    return error;
}

/**
 * return formatted price divide by 1,000
 * @param {*} val
 */
export function getPriceFormatter(val) {
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * return formatted price ranges
 * @param {*} prices
 */
export function getPriceRange(prices) {
    if (prices.length === 1) return getPriceFormatter(prices[0]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `${getPriceFormatter(min)} - ${getPriceFormatter(max)}`;
}

/**
 * return stock range from product's specs
 * @param {*} stocks
 */
export function getStockRange(stocks) {
    if (stocks.length === 1) return stocks;
    const min = Math.min(...stocks);
    const max = Math.max(...stocks);
    return `${min} - ${max}`;
}

/**
 * return parsed number from price string
 * @param {*} val
 */
export function getPriceParser(val) {
    return val.replace(/\$\s?|(,*)/g, '');
}

export function setObjectArray(formData, key, array) {
    // array.forEach((item) => formData.append(key, JSON.stringify(item)));
    formData.set(key, JSON.stringify(array));
    // array.forEach((item) => formData.get(key).push(JSON.stringify(item)));
}

/**
 *
 * @param {*} currentPage
 * @param {*} pageSize
 * @param {*} nbPageFetched
 */
export function getProductFetchPagination(currentPage, nbPageFetched) {
    const startPage = Math.max(currentPage - nbPageFetched, 1);

    return {
        page: startPage,
        limit: pageSize * (2 * nbPageFetched + 1),
    };
}

export function getEndPage(startPage, nbProducts) {
    const nbPages = Math.floor(nbProducts / pageSize);
    return startPage + nbPages;
}

export function getCurrentPage(oldCurrentPage, startPage, nbProducts) {
    let currentPage;
    const endPage = getEndPage(startPage, nbProducts);

    if (oldCurrentPage < startPage || oldCurrentPage > endPage) {
        currentPage = startPage;
    } else {
        currentPage = oldCurrentPage;
    }
    return currentPage;
}
