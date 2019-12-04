import WebsocketManager from './websocketManager';

import {
    online, offline
} from '../actions/websocket';


let man = null;

export function getManager(dispatch, getState) {
  if (man) { return man; }
  man = new WebsocketManager(dispatch, getState);
  return man;
}

export default function initWebsocket(dispatch, getState) {
    const ws = getManager(dispatch, getState);
    ws.joinWebsocket(dispatch, getState);

    ws.on('connected', () => {
        dispatch(online());
    });

    ws.on('disconnected', () => {
        dispatch(offline());
    });
}



/******************************
 * WEBSOCKET MESSAGES SENT TO SERVER
 ******************************/

export function performQueryRepo(dispatch, getState, username, repo) {
  getManager(dispatch, getState).performQueryRepo(username, repo);
}

export function performQueryOrg(dispatch, getState, org) {
  getManager(dispatch, getState).performQueryOrg(org);
}

export function performQueryUser(dispatch, getState, user) {
  getManager(dispatch, getState).performQueryUser(user);
}

export function performQuerySearch(dispatch, getState, language, query) {
  getManager(dispatch, getState).performQuerySearch(language, query);
}
