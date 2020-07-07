const initialState = {
    globalLocale: 'fr', // 全局显示语言, 默认中文
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
