import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import App from './components/app';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';
import { AUTH_USER } from "./actions/types";

const logger = createLogger();
const middlewares = [thunk, promise, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const token = localStorage.getItem("token");

if (token) {

  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>
  , document.querySelector('.container'));
