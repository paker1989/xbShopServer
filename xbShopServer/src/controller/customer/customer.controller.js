const CustomerDAO = require('../../dao/customer.dao');
const { Resolve } = require('../../core/resolve');
const cacheHelper = require('../../core/cache/helper/customerHelper');
const { HttpException } = require('../../core/httpException');

const customerTypes = require('../../core/type/customerType');

/**
 * attempt to delete a user role
 * @param {*} ctx
 */
const saveCustomer = async (ctx) => {
    try {
        const requestBody = ctx.request.body;

        const saved = await CustomerDAO.saveCustomer(requestBody);

        if (typeof saved === 'object') {
            // todo: handle cache 
        }
        Resolve.info(ctx, 'save succeed');
    } catch (err) {
        throw new HttpException(err.message);
    }
};

module.exports = {
    saveCustomer,
};
