'use strict';


// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import configureStore from './reducers/configureStore';

// Router
import { createBrowserHistory } from 'history';
import configureRouter from './router';

// Websocket
import initWebsocket from './api/websocket';


import 'typeface-roboto';




// Setup redux store & URL routing
const history = createBrowserHistory();
const store = configureStore(history);
const router = configureRouter(history);

// Initialize websocket
console.log('Initializing websocket');
initWebsocket(store.dispatch.bind(store), store.getState.bind(store));

// Create root React component
ReactDOM.render(
  <Provider store={store}>
    { router }
  </Provider>,
  document.getElementById('app')
);
