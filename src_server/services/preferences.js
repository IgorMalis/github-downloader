import fs from 'fs';

import {
    PREF_PATH,
} from '../env';

import defaultPreferences from '../constants/preferences';


let _preferences = null;

export function loadPreferences() {
    try {
        var contents = fs.readFileSync(PREF_PATH);
        _preferences = JSON.parse(contents);
        return _preferences;
    } catch (exception) {
        _preferences = defaultPreferences;
        return _preferences;
    }
}

export function savePreferences(contents) {
    _preferences = contents;
    try {
        var contents = JSON.stringify(contents);
        return fs.writeFileSync(PREF_PATH, contents);
    } catch (exception) {
        console.log('Error writing to preferences file.');
    }
}

export function getRepositoryFields() {
    if (_preferences == null) {
        loadPreferences();
    }

    return _preferences.fields.repository;
}

export function getOrganizationFields() {
    if (_preferences == null) {
        loadPreferences();
    }

    return _preferences.fields.organization;
}

export function getUserFields() {
    if (_preferences == null) {
        loadPreferences();
    }

    return _preferences.fields.user;
}

export function getToken() {
    if (_preferences == null) {
        loadPreferences();
    }

    return _preferences.token;
}
