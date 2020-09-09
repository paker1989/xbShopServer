module.exports = {
    login: {
        remMeExpire: 7 * 24 * 3600, // remember me exipre time
    },
    autoLoginKey: 'xbshop_auto_login',
    authedKey: 'authed_profile',
    userSessionMaxAge: 60 * 60 * 1, // 1 hours
    userMenuItems: {
        userSetting: { privileges: [], code: 'usetting', label: 'user.setting' },
        // userCenter: { privileges: [],  code: 'usetting', label: 'user.center', link: '#' },
        loggout: { privileges: [], code: 'logout', label: 'user.logout' },
        vipSetting: { privileges: ['vip'], code: 'vip', label: 'user.vip' },
    },
};
