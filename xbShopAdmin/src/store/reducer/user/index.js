import { combineReducers } from 'redux';

import admins from './adminsReducer';
import addAdmin from './addAdminReducer';
import addRole from './addRoleReducer';

const combinedReducers = combineReducers({ admins, addAdmin, addRole });

export default combinedReducers;
