'use strict';

// Components
import React from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Timer, Lock } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';




// Redux
import { connect } from 'react-redux';

// Redux - actions
import {
    updateToken,
    toggle,
    loadPreferences,
    savePreferences,
} from '../actions/settings.js';

// SASS
import styles from './settings.scss';


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  };



@connect(
    (state, ownProps = {}) => ({
        fields: state.settings.get('fields'),
        token: state.settings.get('token'),
        preferences: state.settings,
    }),
    (dispatch, props) => ({
        updateToken: (v) => dispatch(updateToken(v)),
        toggleField: (c, f) => dispatch(toggle(c, f)),
        loadPreferences: () => dispatch(loadPreferences()),
        savePreferences: (p) => dispatch(savePreferences(p)),
    }),
)
export default class Settings extends React.Component {

    componentDidMount = () => {
        const { loadPreferences } = this.props;
        loadPreferences();
    };

    updateToken = (value) => {
        const { updateToken } = this.props;
        updateToken(value);
    };

    toggleField = (category, field, value) => {
        const { toggleField } = this.props;
        toggleField(category, field);
    };

    performSave = (p) => {
        const { savePreferences } = this.props;
        savePreferences(p);
    };

    render = () => {
        const { fields, token, preferences } = this.props;

        console.log('Repository fields:');
        console.log(fields.get('repository').toJS());

        return (
            <div className={styles.container}>

            <Paper className={styles.card}>
                <CardHeader title="Authentication" />
                <TextField
                    label="GitHub token"
                    className={styles.inputText}
                    value={token}
                    onChange={e => this.updateToken(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />

                  </Paper>

                <Typography className={styles.description}>Select the information you would like to include when downloading:</Typography>

                <Paper className={styles.card}>
                    <CardHeader subheader="Repository" className={styles.lowerCardHeader} />
                    <GridList cellHeight={180} className={styles.gridList} cols={3}>
                        { fields.get('repository').entrySeq().sortBy(([label, value]) => label).map( ([label, value]) => {
                            return <GridListTile key={label} cols={1} style={{ height: 'auto' }}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={label}
                                                    checked={value}
                                                    onChange={event => { this.toggleField('repository', label, event.target.checked); }} />
                                            }
                                            label={capitalize(label)} />
                                    </FormGroup>
                                </FormControl>
                            </GridListTile>
                        })}
                    </GridList>
                    
                    <CardHeader subheader="Organization" className={styles.lowerCardHeader} />
                    <GridList cellHeight={180} className={styles.gridList} cols={3}>
                        { fields.get('organization').entrySeq().sortBy(([label, value]) => label).map( ([label, value]) => {
                            return <GridListTile key={label} cols={1} style={{ height: 'auto' }}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={label}
                                                    checked={value}
                                                    onChange={event => { this.toggleField('organization', label, event.target.checked); }} />
                                            }
                                            label={capitalize(label)} />
                                    </FormGroup>
                                </FormControl>
                            </GridListTile>
                        })}
                    </GridList>

                    <CardHeader subheader="User" className={styles.lowerCardHeader} />
                    <GridList cellHeight={180} className={styles.gridList} cols={3}>
                        { fields.get('user').entrySeq().sortBy(([label, value]) => label).map( ([label, value]) => {
                            return <GridListTile key={label} cols={1} style={{ height: 'auto' }}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={label}
                                                    checked={value}
                                                    onChange={event => { this.toggleField('user', label, event.target.checked); }} />
                                            }
                                            label={capitalize(label)} />
                                    </FormGroup>
                                </FormControl>
                            </GridListTile>
                        })}
                    </GridList>

                </Paper>

                <Button 
                    className={styles.btn}
                    variant="contained"
                    color="primary"
                    onClick={() => { this.performSave(preferences.toJS()); }}>
                    Save
                </Button>

            </div>
        );
    }
}
