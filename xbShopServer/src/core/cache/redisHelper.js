const { promisify } = require('util');
const { redisClient } = require('./redis');

const zRangeAsync = promisify(redisClient.zrange);
const lRangeAsync = promisify(redisClient.lrange);
const rpushAsync = promisify(redisClient.rpush);
const getAsync = promisify(redisClient.get);

const getCacheKey = (prefix, type) => {
    return `${prefix}-${type}`;
};

module.exports = {
    async: { zRangeAsync, lRangeAsync, rpushAsync, getAsync },
    getCacheKey,
};
