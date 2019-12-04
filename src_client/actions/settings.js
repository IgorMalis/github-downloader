import {
    SETTINGS_UPDATE_TOKEN,
    SETTINGS_TOGGLE,
    SETTINGS_PREFERENCES_REQUEST,
    SETTINGS_PREFERENCES_RESPONSE,
    SETTINGS_PREFERENCES_SAVE_REQUEST,
    SETTINGS_PREFERENCES_SAVE_RESPONSE,
} from '../constants/actions';

import { createAction } from 'redux-actions';

import {
  getPreferences,
  savePreferences as savePreferencesApi,
} from '../api';


export function updateToken(value) {
  return (dispatch, getState) => {
    //console.log('updateToek: ' + value);
    dispatch( createAction( SETTINGS_UPDATE_TOKEN )(value) );
  };
}

export function toggle(category, field) {
  return (dispatch, getState) => {
    dispatch( createAction( SETTINGS_TOGGLE )({ category, field }) );
  };
}

export function loadPreferences() {
  return (dispatch, getState) => {
    dispatch( createAction( SETTINGS_PREFERENCES_REQUEST )() );

    const promise = getPreferences(dispatch, getState).then(response => {
      return response.preferences;
    });
    dispatch( createAction( SETTINGS_PREFERENCES_RESPONSE )(promise) );
  };
}

export function savePreferences(p) {
  return (dispatch, getState) => {
    dispatch( createAction( SETTINGS_PREFERENCES_SAVE_REQUEST )() );

    const promise = savePreferencesApi(dispatch, getState, p);

    dispatch( createAction( SETTINGS_PREFERENCES_SAVE_RESPONSE )(promise) );
  };
}
