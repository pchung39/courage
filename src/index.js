import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import App from './components/app';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewEntry from './components/new_entry';


const logger = createLogger();
const middlewares = [thunk, promise, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
