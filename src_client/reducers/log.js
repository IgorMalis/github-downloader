import {
    LOG_START,
    LOG_STOP,
    LOG_RATE_EXCEEDED,
    LOG_UNAUTHORIZED,
    LOG_NOT_FOUND,
} from '../constants/actions';
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

import {
  appendTimestamp,
} from '../services/time';



function updateText(state, text) {
  return state.set('text', appendTimestamp(text) + '\n' + state.get('text'));
}

const initialState = {
    text: appendTimestamp('Ready...'),
};

export default handleActions({
  [LOG_START]: (state, action) => {
    const log = 'Starting...';
    return updateText(state, log);
  },
  [LOG_STOP]: (state, action) => {
    const ratelimit = action.payload;
    const log = `Done. (ratelimit: ${ratelimit[0]}/${ratelimit[1]})`;
    return updateText(state, log);
  },
  [LOG_RATE_EXCEEDED]: (state, action) => {
    const t = action.payload;
    const log = `Rate limit exceeded (waiting ${t.toFixed(2)} min)...`;
    log = updateText(state, log);

    return state.set('text', state.get('text') + log);
  },
  [LOG_UNAUTHORIZED]: (state, action) => {
    const log = `Error: Unauthorized. (wrong token?)`;
    return updateText(state, log);
  },
  [LOG_NOT_FOUND]: (state, action) => {
    const log = `Error: Not found.`;
    return updateText(state, log);
  },
}, Immutable.fromJS(initialState));

