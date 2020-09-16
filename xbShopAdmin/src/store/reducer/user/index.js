import { combineReducers } from 'redux';

import admins from './adminsReducer';
import addAdmin from './addAdminReducer';

const combinedReducers = combineReducers({ admins, addAdmin });

export default combinedReducers;
