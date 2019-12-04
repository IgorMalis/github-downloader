import {
    SETTINGS_UPDATE_TOKEN,
    SETTINGS_TOGGLE,
    SETTINGS_PREFERENCES_REQUEST,
    SETTINGS_PREFERENCES_RESPONSE,
} from '../constants/actions';
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

import defaultPreferences from '../../src_server/constants/preferences';


const initialState = defaultPreferences;

export default handleActions({
  [SETTINGS_UPDATE_TOKEN]: (state, action) => {
    const newValue = action.payload;
    return state.set('token', newValue);
  },
  [SETTINGS_TOGGLE]: (state, action) => {
    const { category, field } = action.payload;
    return state.setIn(['fields', category, field], !state.getIn(['fields', category, field]));
  },
  [SETTINGS_PREFERENCES_REQUEST]: (state, action) => {
    return state;
  },
  [SETTINGS_PREFERENCES_RESPONSE]: (state, action) => {
    const preferences = action.payload;
    return Immutable.fromJS(preferences);
  },
}, Immutable.fromJS(initialState));
