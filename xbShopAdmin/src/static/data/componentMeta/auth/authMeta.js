module.exports = {
    login: {
        remMeExpire: 7 * 24 * 3600, // remember me exipre time
    },
    autoLoginKey: 'xbshop_auto_login',
    authedKey: 'authed_profile',
    userSessionMaxAge: 60 * 60 * 1, // 1 hours
    userMenuItems: {
        userSetting: { privileges: [] },
        userCenter: { privileges: [] },
        loggout: { privileges: [] },
        vipSetting: { privileges: ['vip'] },
    },
};
