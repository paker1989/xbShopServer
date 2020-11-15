const { customer } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { getAsync } = async;
const { prefix, keys } = customer;

const getGeoConstantKey = (countryCode) => `${prefix}:${keys.geoConstant}:${countryCode}`;

const getCachedGeo = async (countryCode) => {
    const data = await getAsync.call(redisClient, getGeoConstantKey(countryCode));
    if (data) {
        return JSON.parse(data);
    }
    return null;
};

const setCachedGeo = (geoData, countryCode) => {
    if (!geoData) {
        throw new Error('geo data is not present');
    }
    if (!countryCode) {
        throw new Error('country code is not present');
    }
    redisClient.set(getGeoConstantKey(countryCode), JSON.stringify(geoData));
};

module.exports = {
    getGeoConstantKey,
    getCachedGeo,
    setCachedGeo,
};
