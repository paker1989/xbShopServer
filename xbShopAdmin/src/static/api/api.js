module.exports = {
    category: {
        getCategories: 'get',
        update: 'update',
    },
    product: {
        save: 'save',
        fetchList: 'fetchList',
        bulkUpdate: 'bulkUpdate',
    },
    auth: {
        login: 'login',
        autoLogin: 'autoLogin',
        logout: 'logout',
        allUserRoles: 'allUserRoles',
        allUserAccesses: 'allUserAccesses',
        updateAdmin: 'updateAdmin',
        updateRole: 'updateRole',
        allAdmins: 'allAdmins',
        deleteUserrole: 'deleteUserrole',
    },
    customer: {
        saveCustomer: 'saveCustomer',
        getCustomer: 'getCustomer',
        fetchConstants: 'fetchConstants',
        getGeoAutos: 'getGeoAutos',
        saveAddress: 'saveAddress',
        getAddresses: 'getAddress',
    },
};
