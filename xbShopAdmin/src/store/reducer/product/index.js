import { combineReducers } from 'redux';
import addProductReducer from './addProductReducer';

const combinedReducers = combineReducers({ addProductReducer });

export default combinedReducers;
