import { DRAWER_TOGGLE } from '../constants/actions.js';
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = {
    sessions: [{
        label: 'Session 1',
        id: 1
    }, {
        label: 'Session 2',
        id: 2
    }],
    current: 1,
};

export default handleActions({
  [DRAWER_TOGGLE]: (state, action) => {
    return state;
  },
}, Immutable.fromJS(initialState));
