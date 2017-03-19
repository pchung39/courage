import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import EntriesIndex from './components/entries_index';
import NewEntry from './components/new_entry';
import Login from './components/facebook_login';
import EntriesMetadata from './components/entries_metadata';
import LandingPage from './components/landing_page';

const logger = createLogger();
const middlewares = [thunk, promise, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={LandingPage} />
      <Route path='/me' component={App} />
    </Router>
  </Provider>
  , document.querySelector('.container'));
