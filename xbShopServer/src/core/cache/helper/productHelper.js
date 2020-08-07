const { product } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { lRangeAsync, rpushAsync, getAsync } = async;
const { prefix, keys } = product;
const { meta, detail, ids } = keys;

/**
 * return product meta redis key;
 * format: product:meta:{{pk}}
 * @param {*} pk
 */
const getProductMetaKey = (pk) => `${prefix}:${meta}:${pk}`;

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
        redisClient.del(getProductMetaKey(idProduct));
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

/**
 * set sorted product ids in redis
 * @param {*} sortedCreteria
 * @param {*} sortedOrder
 * @param {*} result
 */
const setSortedProductIds = (sortedCreteria, sortedOrder, result) => {
    const sortedCacheKey = getSortedProductIdKey(sortedCreteria, sortedOrder);
    redisClient.del(sortedCacheKey, (err) => {
        if (!err) {
            rpushAsync.call(redisClient, sortedCacheKey, result);
        }
    });
};

/**
 * return cached product meta object
 * @param {*} idProduct
 */
const getProductMeta = async (idProduct) => {
    const productMetaKey = getProductMetaKey(idProduct);
    const reply = await getAsync.call(redisClient, productMetaKey);
    if (reply) {
        return JSON.parse(reply);
    }
    return null;
};

/**
 * cache product meta object
 * @param {*} idProduct
 * @param {*} productMeta
 */
const setProductMeta = (idProduct, productMeta) => {
    if (idProduct < 0 || !productMeta) {
        return;
    }
    const productMetaKey = getProductMetaKey(idProduct);
    redisClient.set(productMetaKey, JSON.stringify(productMeta));
};

module.exports = {
    deleteProductCache,
    getSortedProductIds,
    setSortedProductIds,
    getProductMeta,
    setProductMeta,
};
