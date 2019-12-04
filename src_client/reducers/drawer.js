import { DRAWER_TOGGLE } from '../constants/actions.js';
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = {
    open: false
};

export default handleActions({
  [DRAWER_TOGGLE]: (state, action) => {
    return state.set('open', !state.get('open'));
  },
}, Immutable.fromJS(initialState));
