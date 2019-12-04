import { DRAWER_TOGGLE } from '../constants/actions';
import { createAction } from 'redux-actions';

export function toggle() {
  return (dispatch, getState) => {
    dispatch( createAction( DRAWER_TOGGLE )() );
  };
}
