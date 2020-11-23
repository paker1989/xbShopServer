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
        // const { idAddress = -1, action = 'save' } = requestBody;
        const saved = await CustomerDAO.saveAddress(requestBody);
        if (saved) {
            cacheHelper.saveAddress(saved);
            Resolve.json(ctx, saved);
        } else {
            Resolve.info(ctx, 'failed due to unknown reason', 501);
        }
    } catch (err) {
        throw new HttpException(err.message);
    }
};

module.exports = {
    saveCustomer,
    fetchConstants,
    getGeoAutos,
    saveAddress,
};
