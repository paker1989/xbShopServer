import { combineReducers } from 'redux';

import admins from './adminsReducer';

const combinedReducers = combineReducers({ admins });

export default combinedReducers;
