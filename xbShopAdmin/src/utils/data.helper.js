/**
 *  put all data convert util function here
 */

export function getNoEmptyStr(val) {
    return typeof val === 'undefined' || val === null ? '' : val.trim();
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
export function getProductFetchPagination(currentPage, nbSiblingFetched, pageSize) {
    const startPage = Math.max(currentPage - nbSiblingFetched, 1);
    const endPage = startPage + 2 * nbSiblingFetched;

    return {
        page: startPage,
        limit: pageSize * (2 * nbSiblingFetched + 1),
    };
}
