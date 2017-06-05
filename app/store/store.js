/**
 * Redux 库运用于store
 */
import {combineReducers,createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

let composedReducers = combineReducers(reducers);//组合所有的reducer

let createStoreWithMiddleware  = applyMiddleware(thunk)(createStore);

//创建全局唯一的store
let store = createStoreWithMiddleware(composedReducers);

export default store;
