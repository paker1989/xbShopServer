const { customer } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { getAsync } = async;
const { prefix, keys } = customer;

const config = {
    expire: {
        address: 60 * 60 * 4, // 4 小时
    },
};

const getRegionKey = (countryCode) => `${prefix}:${keys.region}:${countryCode}`;
const getDepartmKey = (countryCode) => `${prefix}:${keys.departm}:${countryCode}`;
const getCityKey = (countryCode) => `${prefix}:${keys.city}:${countryCode}`;

const getAddressKey = (customerId) => `${prefix}:${keys.address}:${customerId}`;

const getCachedCities = async (countryCode) => {
    const data = await getAsync.call(redisClient, getCityKey(countryCode));
    if (data) {
        return JSON.parse(data);
    }
    return null;
};

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

const setCachedCities = (cities, countryCode) => {
    if (!cities) {
        throw new Error('geo data is not present');
    }
    if (!countryCode) {
        throw new Error('country code is not present');
    }
    redisClient.set(getCityKey(countryCode), JSON.stringify(cities));
};

/**
 * return all address of customer
 * @param {*} customerId
 */
const getCachedAddress = async (customerId) => {
    const customerAddresses = await getAsync.call(redisClient, getAddressKey(customerId));
    if (customerAddresses) {
        return JSON.parse(customerAddresses);
    }
    return null;
};

const setCachedAddress = async (address, customerId) => {
    if (!address) {
        throw new Error('address is not present');
    }
    if (!customerId) {
        throw new Error('customerId is not present');
    }
    if (address.unshift) {
        // array
        redisClient.set(getAddressKey(customerId), JSON.stringify(address), 'EX', config.expire.address);
        return;
    }

    let cachedAddresses = await getCachedAddress(customerId);
    if (!cachedAddresses) {
        cachedAddresses = [];
    }
    const index = cachedAddresses.findIndex((item) => item.idAddress === address.idAddress);
    if (index !== -1) {
        cachedAddresses.splice(index, 1, address);
    } else {
        cachedAddresses.unshift(address);
    }
    redisClient.set(getAddressKey(customerId), JSON.stringify(cachedAddresses), 'EX', config.expire.address);
};

module.exports = {
    getRegionKey,
    getCachedRegions,
    setCachedRegions,
    getCachedDepartments,
    setCachedDepartments,
    getCachedCities,
    setCachedCities,
    getCachedAddress,
    setCachedAddress,
};
