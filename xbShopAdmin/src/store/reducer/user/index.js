import { combineReducers } from 'redux';

import admins from './adminsReducer';
import addAdmin from './addAdminReducer';
import addRole from './addRoleReducer';
import addCustomer from './customer/addCustomerReducer';

const combinedReducers = combineReducers({ admins, addAdmin, addRole, addCustomer });

export default combinedReducers;
