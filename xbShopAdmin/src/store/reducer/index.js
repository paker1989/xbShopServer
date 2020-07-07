import { combineReducers } from 'redux';
import product from './product';
import categoryReducer from './category/categoryReducer';
import meta from './meta';

const combinedReducers = combineReducers({ product, categoryReducer, meta });

export default combinedReducers;
