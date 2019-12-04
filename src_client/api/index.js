import fetch from 'cross-fetch';

import {
    API_URL,
} from '../env';


function apiCall(dispatch, getState, path, method, body) {
  console.log('Making API call to API: ' + API_URL + path);

  method = method || 'GET';

  let opts = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    json: true
  };

  if (body)
    opts.body = JSON.stringify(body);

  return fetch(API_URL + path, opts)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

    });
}


// GET /api/preferences
export function getPreferences(dispatch, getState) {
  return apiCall(dispatch, getState, '/api/preferences');
}

// POST /api/preferences
export function savePreferences(dispatch, getState, preferences) {
  return apiCall(dispatch, getState, '/api/preferences', 'POST', { preferences } );
}
