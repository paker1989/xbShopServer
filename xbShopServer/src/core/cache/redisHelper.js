const { promisify } = require('util');
const { redisClient } = require('./redis');

const zRangeAsync = promisify(redisClient.zrange);

const getCacheKey = (prefix, type) => {
    return `${prefix}-${type}`;
};

module.exports = {
    async: { zRangeAsync },
    getCacheKey,
};
