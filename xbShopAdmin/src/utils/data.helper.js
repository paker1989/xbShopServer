/**
 *  put all data convert util function here
 */

/* eslint-disable */
export function getNoEmptyStr(val) {
    return typeof val === 'undefined' || val === null ? '' : val.trim();
}
