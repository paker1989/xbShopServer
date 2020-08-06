const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');

const { normalizeGalleryPath } = require('../../core/dateHelper');
const { basePath, port } = require('../../config/config');
const { deleteProductCache, getSortedProductIds } = require('../../core/cache/helper/productHelper');

/**
 * save product
 * @param {*} ctx
 */
const saveProduct = async (ctx) => {
    try {
        const requestBody = ctx.request.body;

        const { idProduct } = requestBody;
        const galleries = Array.isArray(ctx.request.files.galleries)
            ? ctx.request.files.galleries
            : [ctx.request.files.galleries];

        requestBody.galleryPaths = galleries.map((file) => ({
            url: normalizeGalleryPath(`${basePath}:${port}`, file.name),
        }));

        const saved = await ProductDAO.save(requestBody);

        if (typeof saved === 'object') {
            // delete cache
            const isNew = idProduct === '-1';
            deleteProductCache(saved.idProduct, isNew);
        }
        Resolve.info(ctx, 'save succeed');
    } catch (err) {
        throw new HttpException(err.message);
    }
};

const fetchList = async (ctx) => {
    try {
        let ids;
        console.log(ctx.request.body);
        const { sortedCreteria = 'NA', sortedOrder = 'NA' } = ctx.request.body;
        ids = await getSortedProductIds(sortedCreteria, sortedOrder);
        console.log(ids);
        if (!ids || ids.length === 0) {
            ids = await ProductDAO.fetchProductIds(sortedCreteria, sortedOrder);
            console.log(ids[0]);
        }
    } catch (err) {
        console.log(err);
        throw new HttpException(err.message);
    }
};

module.exports = {
    saveProduct,
    fetchList,
};
