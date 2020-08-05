import { combineReducers } from 'redux';

import addProductReducer from './addProductReducer';
import productListReducer from './productListReducer';

const combinedReducers = combineReducers({ addProductReducer, productListReducer });

export default combinedReducers;
