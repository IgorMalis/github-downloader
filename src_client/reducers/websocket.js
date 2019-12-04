import {
    WEBSOCKET_CONNECTED,
    WEBSOCKET_DISCONNECTED,
} from '../constants/actions.js';

import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = {
    connected: false
};


export default handleActions({
  [WEBSOCKET_CONNECTED]: (state, action) => {
    console.log('WEBSOCKET_CONNECTED!!!! 3');
    return state.set('connected', true);
  },
  [WEBSOCKET_DISCONNECTED]: (state, action) => {
    console.log('WEBSOCKET_DISCONNECTED! 3');
    return state.set('connected', false);
  },
}, Immutable.fromJS(initialState));
