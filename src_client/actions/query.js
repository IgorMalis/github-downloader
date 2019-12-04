import {
    QUERY_UPDATE_USERNAME,
    QUERY_UPDATE_REPO,
    QUERY_SEARCH,
    SETTINGS_TAB,
    QUERY_UPDATE_ORGANIZATION,
    QUERY_UPDATE_USER,
    QUERY_UPDATE_LANGUAGE,
    QUERY_UPDATE_REPO_QUERY,
} from '../constants/actions';

import {
    performQueryRepo as performQueryRepoWS,
    performQueryOrg as performQueryOrgWS,
    performQueryUser as performQueryUserWS,
    performQuerySearch as performQuerySearchWS,
} from '../api/websocket';

import { createAction } from 'redux-actions';

export function updateLanguage(v) {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_UPDATE_LANGUAGE )(v) );
  };
}

export function updateUsername(v) {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_UPDATE_USERNAME )(v) );
  };
}

export function updateRepo(v) {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_UPDATE_REPO )(v) );
  };
}

export function updateRepoQuery(v) {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_UPDATE_REPO_QUERY )(v) );
  };
}

export function updateOrganization(v) {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_UPDATE_ORGANIZATION )(v) );
  };
}

export function updateUser(v) {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_UPDATE_USER )(v) );
  };
}

export function performQuery() {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_SEARCH )() );

    const state = getState();
    const username = state.query.get('username');
    const repo = state.query.get('repo');

    performQueryRepoWS(dispatch, getState, username, repo);
  };
}

export function performQuerySearch() {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_SEARCH )() );
    console.log('-----------performQuerySearch-----------');
    const state = getState();
    const language = state.query.get('language');
    const query = state.query.get('query');

    performQuerySearchWS(dispatch, getState, language, query);
  };
}

export function performQueryOrganization() {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_SEARCH )() );

    const state = getState();
    const organization = state.query.get('organization');

    performQueryOrgWS(dispatch, getState, organization);
  };
}

export function performQueryUser() {
  return (dispatch, getState) => {
    dispatch( createAction( QUERY_SEARCH )() );

    const state = getState();
    const user = state.query.get('user');

    performQueryUserWS(dispatch, getState, user);
  };
}

export function updateTab(v) {
  return (dispatch, getState) => {
    dispatch( createAction( SETTINGS_TAB )(v) );
  };
}
