/**
 * 上传照片的压缩设置
 */
// import * as MetaActionType from '../../actionType/metaActionType';

const initialState = {
    compress: {
        /**
         * 商品图片上传的压缩设置
         */
        gallery: {
            maxWidth: 0,
            maxHeight: 800,
            qualityRatio: 0.9,
            maxOriginFileSize: 5 * 1024 * 1024,
        },
        /**
         * 商品详情编辑的压缩设置
         */
        detailDesp: {
            maxWidth: 1400,
            maxHeight: 0,
            qualityRatio: 0.9,
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
