const initialState = {
    loginOpt: 'account', // account, mobile
    rememberMe: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
