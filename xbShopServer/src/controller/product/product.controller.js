const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');

const { normalizeGalleryPath } = require('../../core/dateHelper');
const { basePath, port } = require('../../config/config');

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

        await ProductDAO.save(requestBody);
        Resolve.info(ctx, 'save succeed');
    } catch (err) {
        throw new HttpException(err.message);
    }
};

module.exports = {
    saveProduct,
};
