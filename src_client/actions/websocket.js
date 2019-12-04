import {
    WEBSOCKET_CONNECTED,
    WEBSOCKET_DISCONNECTED,
} from '../constants/actions';

import { createAction } from 'redux-actions';

export function online() {
  return (dispatch, getState) => {
    dispatch( createAction( WEBSOCKET_CONNECTED )() );
  };
}

export function offline() {
  return (dispatch, getState) => {
    dispatch( createAction( WEBSOCKET_DISCONNECTED )() );
  };
}
