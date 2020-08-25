const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');

const { normalizeGalleryPath } = require('../../core/dateHelper');
const { basePath, port } = require('../../config/config');
const {
    cleanProductCache,
    getSortedProductIds,
    setSortedProductIds,
} = require('../../core/cache/helper/productHelper');
const productHelper = require('../../core/cache/helper/productHelper');
// const { product } = require('../../../../xbShopAdmin/src/static/api/api');

/**
 * save product
 * @param {*} ctx
 */
const saveProduct = async (ctx) => {
    try {
        const requestBody = ctx.request.body;

        const galleries = Array.isArray(ctx.request.files.galleries)
            ? ctx.request.files.galleries
            : [ctx.request.files.galleries];

        requestBody.galleryPaths = galleries.map((file) => ({
            url: normalizeGalleryPath(`${basePath}:${port}`, file.name),
        }));

        const saved = await ProductDAO.save(requestBody);

        if (typeof saved === 'object') {
            // delete cache
            await cleanProductCache(saved.idProduct);
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

/**
 * return { data, totalCnt, refined_startPage }
 * @param {*} ctx
 */
const fetchList = async (ctx) => {
    try {
        let ids;
        let _startPage;
        const data = [];
        const {
            sortedCreteria = 'NA',
            sortedOrder = 'NA',
            limit,
            pageSize,
            startPage = 1,
            filter = 'all',
        } = ctx.request.body;
        // console.log(ctx.request.body);

        ids = await getSortedProductIds(sortedCreteria, sortedOrder, filter); // get cached sorted ids
        if (!ids || ids.length === 0) {
            // console.log('sorted product id cache not exists');
            ids = await ProductDAO.fetchProductIds(sortedCreteria, sortedOrder, filter); // fetch from db if not found in cached
            setSortedProductIds(sortedCreteria, sortedOrder, filter, ids); // set in cache
        }

        if (ids.length < pageSize * startPage) {
            _startPage = 1;
        } else {
            _startPage = startPage;
        }
        console.log(ids);
        console.log(`${pageSize * (_startPage - 1)} ---  ${pageSize * (_startPage - 1) + limit}`);
        const slices = ids.slice(pageSize * (_startPage - 1), pageSize * (_startPage - 1) + limit); // pagination
        slices.forEach((id) => {
            data.push(fetchProductMeta(id));
        });
        Resolve.json(ctx, { products: await Promise.all(data), totalCnt: ids.length, startPage: _startPage });
    } catch (err) {
        throw new HttpException(err.message);
    }
};

/**
 *
 * @param {*} ctx
 */
/* eslint-disable */
const bulkUpdate = async (ctx) => {
    /* eslint-enable */
    const { action, pks } = ctx.request.body;
    let updated = 0;
    switch (action) {
        case 'delete':
            updated = await ProductDAO.bulkUpdateProduct(pks, { isDeleted: 1 });
            break;
        case 'offShelf':
            updated = await ProductDAO.bulkUpdateProduct(pks, { isOffshelf: 1 });
            break;
        case 'onShelf':
            updated = await ProductDAO.bulkUpdateProduct(pks, { isOffshelf: 0 });
            break;
        default:
            break;
    }

    if (updated && updated.length > 0) {
        const cleanRes = await productHelper.cleanCacheOnBulkUpdate(pks, action);
        if (cleanRes) {
            return fetchList(ctx);
        }
    }

    Resolve.info(ctx, 'bulk update succeed');
};

module.exports = {
    saveProduct,
    fetchList,
    bulkUpdate,
};
