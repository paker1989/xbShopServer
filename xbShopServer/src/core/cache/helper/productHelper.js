const { product } = require('../cachePrefix');
const redisClient = require('../redis');

const { prefix, keys } = product;
const { bref, detail } = keys;

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

module.exports = {
    deleteProductCache,
};
