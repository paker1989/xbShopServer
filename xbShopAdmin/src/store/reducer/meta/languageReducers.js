import * as MetaActionType from '../../actionType/metaActionType';

const initialState = {
    globalLocale: 'zh', // 全局显示语言, 默认中文
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MetaActionType._CHANGE_LOCALE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
