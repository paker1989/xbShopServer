const { product } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { lRangeAsync, rpushAsync, getAsync } = async;
const { prefix, keys } = product;
const { meta, detail, ids } = keys;

const config = {
    expire: {
        productMeta: 60 * 60 * 4, // 4 小时
    },
};
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
const getSortedProductIdKey = (sortedCreteria, sortedOrder, filter) => {
    // console.log(`${prefix}:${sortedCreteria}:${sortedOrder}:${ids}`);
    if (filter) {
        return `${prefix}:${sortedCreteria}:${sortedOrder}:${filter}:${ids}`;
    }
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
const getSortedProductIds = async (sortedCreteria, sortedOrder, filter) => {
    const productIds = await lRangeAsync.call(
        redisClient,
        getSortedProductIdKey(sortedCreteria, sortedOrder, filter),
        0,
        -1
    );
    return productIds;
};

/**
 * set sorted product ids in redis
 * @param {*} sortedCreteria
 * @param {*} sortedOrder
 * @param {*} result
 */
const setSortedProductIds = (sortedCreteria, sortedOrder, filter, result) => {
    const sortedCacheKey = getSortedProductIdKey(sortedCreteria, sortedOrder, filter);
    redisClient.del(sortedCacheKey, (err) => {
        if (!err && result.length > 0) {
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
    const expired = config.expire.productMeta;
    redisClient.set(productMetaKey, JSON.stringify(productMeta), 'EX', expired);
};

module.exports = {
    deleteProductCache,
    getSortedProductIds,
    setSortedProductIds,
    getProductMeta,
    setProductMeta,
};
