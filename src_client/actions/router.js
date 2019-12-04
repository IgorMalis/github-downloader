'use strict';

import { push } from 'connected-react-router';
import { createAction } from 'redux-actions';

//import { NAVIGATE_SETTINGS } from '../constants/actions';


export function settings() {
  return (dispatch, getState) => {
    dispatch(push('/settings'));
  };
}

export function query(id) {
  return (dispatch, getState) => {
    dispatch(push(`/query/${id}`));
  };
}

export function progress(id) {
  return (dispatch, getState) => {
    dispatch(push(`/progress/${id}`));
  };
}
