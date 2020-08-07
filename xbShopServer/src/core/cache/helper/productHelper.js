const { product } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { lRangeAsync } = async;
const { prefix, keys } = product;
const { bref, detail, ids } = keys;

/**
 * return product bref redis key;
 * format: product:bref:{{pk}}
 * @param {*} pk
 */
const getBrefProductKey = (pk) => `${prefix}:${bref}:${pk}`;

/**
 * return product detail redis key;
 * format: product:detail:{{pk}}
 * @param {*} pk
 */
const getDetailProductKey = (pk) => `${prefix}:${detail}:${pk}`;

/**
 * return sorted product id cache key
 * e.g.: product:stock:desc:ids
 * @param {*} sortedCreteria
 * @param {*} sortedOrder
 */
const getSortedProductIdKey = (sortedCreteria, sortedOrder) => {
    return `${prefix}:${sortedCreteria}:${sortedOrder}:${ids}`;
};

/**
 * delete all product id caches
 */
const deleteListIdCache = () => {
    // to do
};

/**
 *  delete product cache when product is updated
 * @param {*} idProduct
 * @param {*} isNew
 */
const deleteProductCache = (idProduct, isNew) => {
    if (isNew) {
        deleteListIdCache();
    } else {
        redisClient.del(getBrefProductKey(idProduct));
        redisClient.del(getDetailProductKey(idProduct));
    }
};

/**
 * get all cached sorted product ids
 * @param {*} sortedCreteria
 * @param {*} sortedOrder
 */
const getSortedProductIds = async (sortedCreteria, sortedOrder) => {
    const productIds = await lRangeAsync.call(redisClient, getSortedProductIdKey(sortedCreteria, sortedOrder), 0, -1);
    return productIds;
};

const setSortedProductIds = async (sortedCreteria, sortedOrder, result) => {
    redisClient.l
}

module.exports = {
    deleteProductCache,
    getSortedProductIds,
};
