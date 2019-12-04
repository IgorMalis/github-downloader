import {
    QUERY_UPDATE_USERNAME,
    QUERY_UPDATE_REPO,
    QUERY_SEARCH,
    LOG_START,
    LOG_STOP,
    SETTINGS_TAB,
    QUERY_UPDATE_ORGANIZATION,
    QUERY_UPDATE_USER,
    QUERY_UPDATE_LANGUAGE,
    QUERY_UPDATE_REPO_QUERY,
    LOG_RATE_LIMIT,
} from '../constants/actions.js';

import { handleActions } from 'redux-actions';
import Immutable from 'immutable';



const initialState = {
    username: 'octocat',
    repo: 'Hello-World',
    progress: false,
    tab: 0,
    organization: 'facebook',
    user: 'fabpot',
    query: 'tetris',
    language: 'kotlin',

    // Ratelimit info
    rateVisible: true,
    rateRemaining: 2745,
    rateTotal: 5000,
};

export default handleActions({
  [QUERY_UPDATE_USERNAME]: (state, action) => {
    const newValue = action.payload;
    return state.set('username', newValue);
  },
  [QUERY_UPDATE_REPO]: (state, action) => {
    const newValue = action.payload;
    return state.set('repo', newValue);
  },
  [LOG_START]: (state, action) => {
    return state.set('progress', true);
  },
  [LOG_STOP]: (state, action) => {
    return state.set('progress', false);
  },
  [SETTINGS_TAB]: (state, action) => {
    const newValue = action.payload;
    return state.set('tab', newValue);
  },
  [QUERY_UPDATE_ORGANIZATION]: (state, action) => {
    const newValue = action.payload;
    return state.set('organization', newValue);
  },
  [QUERY_UPDATE_USER]: (state, action) => {
    const newValue = action.payload;
    return state.set('user', newValue);
  },
  [QUERY_UPDATE_LANGUAGE]:  (state, action) => {
    const newValue = action.payload;
    return state.set('language', newValue);
  },
  [QUERY_UPDATE_REPO_QUERY]:  (state, action) => {
    const newValue = action.payload;
    return state.set('query', newValue);
  },
  [LOG_RATE_LIMIT]:  (state, action) => {
    const { remaining, total } = action.payload;
    return state.set('rateVisible', true)
      .set('rateRemaining', remaining)
      .set('rateTotal', total);
  },
}, Immutable.fromJS(initialState));
