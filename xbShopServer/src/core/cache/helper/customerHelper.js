const { customer } = require('../cachePrefix');
const { redisClient } = require('../redis');
const { async } = require('../redisHelper');

const { HttpException } = require('../../httpException');

const { getAsync, rpushAsync, lRangeAsync } = async;
const { prefix, keys } = customer;

const config = {
    expire: {
        address: 60 * 60 * 4, // 4 小时
        meta: 60 * 60 * 4, // 4 小时
    },
};

const getRegionKey = (countryCode) => `${prefix}:${keys.region}:${countryCode}`;
const getDepartmKey = (countryCode) => `${prefix}:${keys.departm}:${countryCode}`;
const getCityKey = (countryCode) => `${prefix}:${keys.city}:${countryCode}`;
const getAddressKey = (customerId) => `${prefix}:${keys.address}:${customerId}`;
const getCustomerIdsKey = ({ filter = 'NA', sort = 'NA', sortOrder = 'NA' }) =>
    `${prefix}:${keys.cids}:filter:${filter}:sort:${sort}^${sortOrder}`;
const getCustomerMetaKey = (customerId) => `${prefix}:${keys.meta}:${customerId}`;

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

const setCachedAddress = async (address, customerId, action = 'save') => {
    if (!address) {
        throw new Error('address is not present');
    }
    if (!customerId) {
        throw new Error('customerId is not present');
    }
    let cachedAddresses = await getCachedAddress(customerId);

    // delete case
    if (action === 'delete') {
        if (!cachedAddresses) {
            return;
        }
        if (!address.nbDeleted) {
            return;
        }

        const index = cachedAddresses.findIndex((item) => item.idAddress === address.idAddress);
        if (index !== -1) {
            cachedAddresses.splice(index, 1);
            redisClient.set(getAddressKey(customerId), JSON.stringify(cachedAddresses), 'EX', config.expire.address);
        }
        return;
    }

    // update whole list case
    if (address.unshift) {
        // array
        redisClient.set(getAddressKey(customerId), JSON.stringify(address), 'EX', config.expire.address);
        return;
    }

    // update single case
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

const removeCachedAddress = (customerId) => {
    redisClient.del(getAddressKey(customerId));
};

const getCustomerIds = async ({ filter, sort, sortOrder }) => {
    const ids = await lRangeAsync.call(redisClient, getCustomerIdsKey({ filter, sort, sortOrder }), 0, -1);
    return ids;
};

const setCustomerIds = ({ filter, sort, sortOrder, ids }) => {
    if (!ids) {
        throw new Error('customer ids is null');
    }
    const cacheKey = getCustomerIdsKey({ filter, sort, sortOrder });
    // redisClient.set(cacheKey, ids);
    redisClient.del(cacheKey, (err) => {
        if (!err && ids.length > 0) {
            rpushAsync.call(redisClient, cacheKey, ids);
        }
    });
};

const removeCustomerIds = ({ filter, sort, sortOrder }) => {
    const cacheKey = getCustomerIdsKey({ filter, sort, sortOrder });
    redisClient.del(cacheKey);
};

const getCustomerMeta = async (id) => {
    const data = await getAsync.call(redisClient, getCustomerMetaKey(id));
    if (data) {
        return JSON.parse(data);
    }
    return null;
};

const setCustomerMeta = (meta) => {
    if (!meta || !meta.idCustomer) {
        throw new Error('customer meta is not present');
    }
    redisClient.set(getCustomerMetaKey(meta.idCustomer), JSON.stringify(meta), 'EX', config.expire.meta);
};

const cleanCustomerIdCache = (action) => {
    return new Promise((resolve) => {
        if (!action) {
            resolve(true);
        }

        let keyPattern = '';

        switch (action) {
            case 'create':
            case 'delete':
                keyPattern = `*${prefix}*${keys.cids}*`;
                break;
            case 'update':
                break;
            default:
                keyPattern = `*${prefix}*${keys.cids}*`;
                break;
        }

        redisClient
            .multi()
            .keys(keyPattern)
            .exec((err, replies) => {
                if (err) {
                    throw new HttpException('clean customer id cache on delete failed');
                }
                const relatedCachedKeys = replies[0];
                if (relatedCachedKeys.length > 0) {
                    redisClient.del(...relatedCachedKeys, () => {
                        resolve(true);
                    });
                } else {
                    resolve(true);
                }
            });
    });
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
    removeCachedAddress,
    getCustomerIdsKey,
    getCustomerMetaKey,
    setCustomerIds,
    getCustomerIds,
    removeCustomerIds,
    getCustomerMeta,
    setCustomerMeta,
    cleanCustomerIdCache,
};
