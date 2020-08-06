const { promisify } = require('util');
const { redisClient } = require('./redis');

const zRangeAsync = promisify(redisClient.zrange);
const lRangeAsync = promisify(redisClient.lrange);

const getCacheKey = (prefix, type) => {
    return `${prefix}-${type}`;
};

module.exports = {
    async: { zRangeAsync, lRangeAsync },
    getCacheKey,
};
