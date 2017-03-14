import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
//import reducers from './reducers';
import promise from 'redux-promise';
import App from './components/app';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';

const logger = createLogger();
const middlewares = [thunk, promise, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
//before applyMiddleware "combineReducers(reducers),""
//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
