import { combineReducers } from 'redux';
import imageReducers from './imageReducers';
import languageReducers from './languageReducers';

const combinedReducers = combineReducers({ imageReducers, languageReducers });

export default combinedReducers;
