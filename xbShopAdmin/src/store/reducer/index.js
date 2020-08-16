import { combineReducers } from 'redux';
import product from './product';
import categoryReducer from './category/categoryReducer';
import meta from './meta';
import auth from './auth/authReducer';

const combinedReducers = combineReducers({ product, categoryReducer, meta, auth });

export default combinedReducers;
