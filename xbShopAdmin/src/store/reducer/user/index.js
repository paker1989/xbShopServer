import { combineReducers } from 'redux';

import admins from './adminsReducer';
import addAdmin from './addAdminReducer';
import addRole from './addRoleReducer';
import addCustomer from './customer/addCustomerReducer';
import addAddress from './customer/addAddressReducer';
import customerCmn from './customer/customerGlobalReducer';

const combinedReducers = combineReducers({ admins, addAdmin, addRole, addCustomer, addAddress, customerCmn });

export default combinedReducers;
