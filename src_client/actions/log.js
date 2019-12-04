import {
    LOG_START,
    LOG_STOP,
    LOG_RATE_EXCEEDED,
    LOG_UNAUTHORIZED,
    LOG_NOT_FOUND,
    LOG_RATE_LIMIT,
} from '../constants/actions';

import { createAction } from 'redux-actions';

export function start() {
  return (dispatch, getState) => {
    dispatch( createAction( LOG_START )() );
  };
}

export function stop(ratelimit) {
  return (dispatch, getState) => {
    dispatch( createAction( LOG_STOP )(ratelimit) );
  };
}

export function rateLimitExceeded(t) {
  return (dispatch, getState) => {
    dispatch( createAction( LOG_RATE_EXCEEDED )(t) );
  };
}

export function unauthorized() {
  return (dispatch, getState) => {
    dispatch( createAction( LOG_UNAUTHORIZED )() );
  };
}

export function notFound() {
  return (dispatch, getState) => {
    dispatch( createAction( LOG_NOT_FOUND )() );
  };
}

export function rateLimit(remaining, total) {
  return (dispatch, getState) => {
    dispatch( createAction( LOG_RATE_LIMIT )({ remaining, total }) );
  };
}
