/**
 *  put all data convert util function here
 */

/* eslint-disable */
export function getNoEmptyStr(val) {
    return typeof val === 'undefined' || val === null ? '' : val.trim();
}

/**
 * return formatted price divide by 1,000
 * @param {*} val
 */
export function getPriceFormatter(val) {
    // console.log(`val = ${val}`);
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * return parsed number from price string
 * @param {*} val
 */
export function getPriceParser(val) {
    return val.replace(/\$\s?|(,*)/g, '');
}
