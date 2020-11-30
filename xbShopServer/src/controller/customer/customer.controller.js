const CustomerDAO = require('../../dao/customer.dao');
const { Resolve } = require('../../core/resolve');
const cacheHelper = require('../../core/cache/helper/customerHelper');
const { HttpException } = require('../../core/httpException');

const { normalizeImgPath } = require('../../core/dateHelper');
const { basePath, port } = require('../../config/config');

// const ErrorTypes = require('../../core/type/customerType');

/**
 * attempt to delete a user role
 * @param {*} ctx
 */
const saveCustomer = async (ctx) => {
    try {
        const requestBody = ctx.request.body;
        const { idCustomer, email, pseudo, action = 'create' } = requestBody;

        if (ctx.request.files && ctx.request.files.thumbnail) {
            const thumbnailFile = Array.isArray(ctx.request.files.thumbnail)
                ? ctx.request.files.thumbnail[0]
                : ctx.request.files.thumbnail;

            requestBody.thumbnail = normalizeImgPath(`${basePath}:${port}`, 'thumbnail', thumbnailFile.name);
        }

        if (action === 'create') {
            const error = await CustomerDAO.checkDuplicaCustomer(idCustomer, email, pseudo);
            if (error.length > 0) {
                Resolve.info(ctx, error, 403);
                return;
            }
        }
        const saved = await CustomerDAO.saveCustomer(requestBody);

        if (typeof saved === 'object') {
            // todo: handle cache
        }
        Resolve.json(ctx, { customerId: saved.idCustomer }, 'save succeed');
    } catch (err) {
        throw new HttpException(err.message);
    }
};

const fetchConstants = async (ctx) => {
    // to refine in the future
    Resolve.json(ctx, [{ countryId: 1, countryCode: 'fr' }]);
};

/* eslint-disable no-case-declarations */
const getGeoAutos = async (ctx) => {
    const { type, countryCode, searchStr } = ctx.request.body;

    if (!countryCode) {
        Resolve.json(ctx, []);
        return;
    }

    try {
        switch (type) {
            case 'region':
                const cached = await cacheHelper.getCachedDepartments(countryCode);
                if (cached) {
                    console.log('hit cache');
                    const data = cached.filter(
                        (department) => department.text.toLowerCase().includes(searchStr.toLowerCase())
                        // department.slug.includes(searchStr) ||
                        // department.code.includes(searchStr) ||
                        // department.name.includes(searchStr) ||
                        // department.region.slug.includes(searchStr) ||
                        // department.region.name.includes(searchStr)
                    );
                    Resolve.json(ctx, { cnt: data.length, data });
                } else {
                    const departmData = await CustomerDAO.getDepartmByCountry(countryCode);
                    cacheHelper.setCachedDepartments(departmData, countryCode);
                    const filteredData = departmData
                        .filter((department) => department.text.toLowerCase().includes(searchStr.toLowerCase()))
                        .slice(0, 100);

                    Resolve.json(ctx, { cnt: filteredData.length, data: filteredData });
                }
                return;
            case 'city':
                const cachedCities = await cacheHelper.getCachedCities(countryCode);
                if (cachedCities) {
                    console.log('hit cache');
                    const data = cachedCities.filter(
                        (city) => city.text.toLowerCase().includes(searchStr.toLowerCase())
                        // department.slug.includes(searchStr) ||
                        // department.code.includes(searchStr) ||
                        // department.name.includes(searchStr) ||
                        // department.region.slug.includes(searchStr) ||
                        // department.region.name.includes(searchStr)
                    );
                    Resolve.json(ctx, { cnt: data.length, data });
                } else {
                    const cityData = await CustomerDAO.getCitiesByCountry(countryCode);
                    cacheHelper.setCachedCities(cityData, countryCode);
                    const filteredData = cityData
                        .filter((city) => city.text.toLowerCase().includes(searchStr.toLowerCase()))
                        .slice(0, 100);

                    Resolve.json(ctx, { cnt: filteredData.length, data: filteredData });
                }
                return;
            default:
                return;
        }
    } catch (err) {
        throw new HttpException(err.message);
    }
};

/**
 * save address
 * @param {*} ctx
 */
const saveAddress = async (ctx) => {
    try {
        const requestBody = ctx.request.body;
        const { action = 'save' } = requestBody;

        const saved = await CustomerDAO.saveAddress(requestBody);
        if (saved) {
            if (action === 'setDefault') {
                cacheHelper.removeCachedAddress(saved.customerId);
            } else {
                cacheHelper.setCachedAddress(saved, saved.customerId, action);
            }

            Resolve.json(ctx, saved);
        } else {
            Resolve.info(ctx, 'failed due to unknown reason', 501);
        }
    } catch (err) {
        throw new HttpException(err.message);
    }
};

/**
 * return all addresses or a target address of a customer
 * @param {*} ctx
 */
const getAddress = async (ctx) => {
    try {
        const { customerId, addressId } = ctx.request.body;

        if (!customerId) {
            Resolve.info(ctx, 'customer id is not present', 400);
            return;
        }

        let cachedAddresses = await cacheHelper.getCachedAddress(customerId);
        if (!cachedAddresses) {
            cachedAddresses = await CustomerDAO.getAddress(customerId);
            cacheHelper.setCachedAddress(cachedAddresses, customerId);
        }
        if (!addressId) {
            Resolve.json(ctx, cachedAddresses);
            return;
        }
        const address = cachedAddresses.find((item) => item.idAddress === parseInt(addressId, 10));
        Resolve.json(ctx, address);
    } catch (err) {
        throw new HttpException(err.message);
    }
};

const getCustomerMeta = async (id) => {
    const cached = await cacheHelper.getCustomerMeta(id);
    if (cached) {
        return cached;
    }
    const customer = await CustomerDAO.getCustomerMetas({ ids: id });
    if (customer) {
        cacheHelper.setCustomerMeta(customer);
    }
    return customer;
};

const getCustomerList = async (ctx) => {
    let _startPage = 1;
    let ids;
    const data = [];
    const { filter = 'NA', sort = 'NA', sortOrder = 'NA', pSize = '20', start = 1, limit = 50 } = ctx.request.body;

    ids = await cacheHelper.getCustomerIds({ filter, sort, sortOrder }); // get cached sorted ids
    if (!ids || ids.length === 0) {
        ids = await CustomerDAO.getCustomerIds({ filter, sort, sortOrder }); // fetch from db if not found in cached
        cacheHelper.setCustomerIds({ filter, sort, sortOrder, ids }); // set in cache
    }

    if (ids.length < pSize * start) {
        _startPage = 1;
    } else {
        _startPage = start;
    }
    const slices = ids.slice(pSize * (_startPage - 1), pSize * (_startPage - 1) + limit); // pagination
    slices.forEach((id) => {
        data.push(getCustomerMeta(id));
    });
    Resolve.json(ctx, { data: await Promise.all(data), totalCnt: ids.length, startPage: _startPage });
};

module.exports = {
    saveCustomer,
    fetchConstants,
    getGeoAutos,
    saveAddress,
    getAddress,
    getCustomerList,
};
