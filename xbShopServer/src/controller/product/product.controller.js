const ProductDAO = require('../../dao/product.dao');
const { Resolve } = require('../../core/resolve');
const { HttpException } = require('../../core/httpException');
const { uploadImg } = require('../../core/upload');
/**
 * update category
 * @param {*} ctx
 */
const saveProduct = async (ctx) => {
    // console.log(ctx.request.files);
    console.log(ctx.request.files.galleries.name);

    // const galleryUrls = await uploadImg(ctx.request.files);

    // const savedProduct = await ProductDAO.save(ctx.request.body);
    // if (true) {
    //     Resolve.info(ctx, 'save succeed');
    // } else {
    //     throw new HttpException('update category failed');
    // }
};

module.exports = {
    saveProduct,
};
