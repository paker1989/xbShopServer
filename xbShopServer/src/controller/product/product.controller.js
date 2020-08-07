const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');

const { normalizeGalleryPath } = require('../../core/dateHelper');
const { basePath, port } = require('../../config/config');
const {
    deleteProductCache,
    getSortedProductIds,
    setSortedProductIds,
} = require('../../core/cache/helper/productHelper');
const productHelper = require('../../core/cache/helper/productHelper');

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

/**
 * fetch product bref
 * @param {*} idProduct
 */
const fetchProductMeta = async (idProduct) => {
    const cached = await productHelper.getProductMeta(idProduct);
    if (cached) {
        // if found in cache, returned
        console.log('cached');
        return cached;
    }
    const productMeta = await ProductDAO.fetchProductMeta(idProduct); // fetch from db
    productHelper.setProductMeta(idProduct, productMeta); // cache the product meta
    return productMeta;
};

const fetchList = async (ctx) => {
    try {
        let ids;
        const data = [];
        const { sortedCreteria = 'NA', sortedOrder = 'NA', limit = 50, page = 1 } = ctx.request.body;

        ids = await getSortedProductIds(sortedCreteria, sortedOrder); // get cached sorted ids
        if (!ids || ids.length === 0) {
            ids = await ProductDAO.fetchProductIds(sortedCreteria, sortedOrder); // fetch from db if not found in cached
            setSortedProductIds(sortedCreteria, sortedOrder, ids); // set in cache
        }

        const slices = ids.slice(limit * (page - 1), limit * page); // pagination
        slices.forEach((id) => {
            data.push(fetchProductMeta(id));
        });
        Resolve.json(ctx, { products: await Promise.all(data), totalCnt: ids.length });
    } catch (err) {
        throw new HttpException(err.message);
    }
};

module.exports = {
    saveProduct,
    fetchList,
};
