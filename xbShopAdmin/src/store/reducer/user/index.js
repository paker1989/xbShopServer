import { combineReducers } from 'redux';

import admins from './adminsReducer';
import addAdmin from './addAdminReducer';
import addRole from './addRoleReducer';
import addCustomer from './customer/addCustomerReducer';
import addAddress from './customer/addAddressReducer';
import customerCmn from './customer/customerGlobalReducer';
import customers from './customer/customersReducer';

const combinedReducers = combineReducers({
    admins,
    addAdmin,
    addRole,
    addCustomer,
    addAddress,
    customerCmn,
    customers,
});

export default combinedReducers;
