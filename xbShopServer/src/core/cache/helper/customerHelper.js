const { customer } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { getAsync } = async;
const { prefix, keys } = customer;

const getRegionKey = (countryCode) => `${prefix}:${keys.region}:${countryCode}`;
const getDepartmKey = (countryCode) => `${prefix}:${keys.departm}:${countryCode}`;

const getCachedRegions = async (countryCode) => {
    const data = await getAsync.call(redisClient, getRegionKey(countryCode));
    if (data) {
        return JSON.parse(data);
    }
    return null;
};

const getCachedDepartments = async (countryCode) => {
    const data = await getAsync.call(redisClient, getDepartmKey(countryCode));
    if (data) {
        return JSON.parse(data);
    }
    return null;
};

const setCachedRegions = (regionData, countryCode) => {
    if (!regionData) {
        throw new Error('geo data is not present');
    }
    if (!countryCode) {
        throw new Error('country code is not present');
    }
    redisClient.set(getRegionKey(countryCode), JSON.stringify(regionData));
};

const setCachedDepartments = (departmData, countryCode) => {
    if (!departmData) {
        throw new Error('geo data is not present');
    }
    if (!countryCode) {
        throw new Error('country code is not present');
    }
    redisClient.set(getDepartmKey(countryCode), JSON.stringify(departmData));
};

module.exports = {
    getRegionKey,
    getCachedRegions,
    setCachedRegions,
    getCachedDepartments,
    setCachedDepartments,
};
