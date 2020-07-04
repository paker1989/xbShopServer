import { combineReducers } from 'redux';
import product from './product';
import categoryReducer from './category/categoryReducer';

const combinedReducers = combineReducers({ product, categoryReducer });

export default combinedReducers;
