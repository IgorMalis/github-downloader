'use strict';

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

// Reducers
import * as reducers from './index';

// Router
import { connectRouter, routerMiddleware } from 'connected-react-router';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers
});

const configureStore = (history) => createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
        routerMiddleware(history),
        promiseMiddleware,
        thunkMiddleware
    )
  )
);

export default configureStore;
