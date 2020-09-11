import { combineReducers } from 'redux';
import product from './product';
import categoryReducer from './category/categoryReducer';
import meta from './meta';
import auth from './auth/authReducer';
import user from './user';

const combinedReducers = combineReducers({ product, categoryReducer, meta, auth, user });

export default combinedReducers;
