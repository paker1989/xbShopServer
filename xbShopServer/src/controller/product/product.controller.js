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
        const { sortedCreteria = 'NA', sortedOrder = 'NA', limit = 50, page = 1, filter } = ctx.request.body;

        // console.log(filter);
        ids = await getSortedProductIds(sortedCreteria, sortedOrder, filter); // get cached sorted ids
        if (!ids || ids.length === 0) {
            // console.log('sorted product id cache not exists');
            ids = await ProductDAO.fetchProductIds(sortedCreteria, sortedOrder, filter); // fetch from db if not found in cached
            setSortedProductIds(sortedCreteria, sortedOrder, filter, ids); // set in cache
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

const bulkUpdate = async (ctx) => {
    // console.log(ctx.request.body);
    const { action, pks } = ctx.request.body;
    let updated = 0;
    switch (action) {
        case 'delete':
            updated = await ProductDAO.bulkUpdateProduct(pks, { isDeleted: 1 });
            break;
        case 'offShelf':
            updated = await ProductDAO.bulkUpdateProduct(pks, { isOffshelf: 1 });
            break;
        default:
            break;
    }
    console.log(updated);
    if (updated > 0) {
        // to do
    }
    Resolve.info(ctx, 'bulk update succeed');
};

module.exports = {
    saveProduct,
    fetchList,
    bulkUpdate,
};