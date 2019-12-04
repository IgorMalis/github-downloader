'use strict';

// Components
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';




// Redux
import { connect } from 'react-redux';

// Redux - actions
import {
    performQuerySearch,
    updateLanguage,
    updateRepoQuery,
} from '../../actions/query.js';

// SASS
import styles from './query.scss';


@connect(
    (state, ownProps = {}) => ({
        progress: state.query.get('progress'),
        log: state.log.get('text'),
        tab: state.query.get('tab'),
        language: state.query.get('language'),
        query: state.query.get('query'),
    }),
    (dispatch, props) => ({
        performQuerySearch: () => dispatch(performQuerySearch()),
        updateLanguage: (v) => dispatch(updateLanguage(v)),
        updateRepoQuery: (v) => dispatch(updateRepoQuery(v)),
    }),
)
export default class SearchQuery extends React.Component {

    performQuerySearch = () => {
        const { performQuerySearch } = this.props;
        performQuerySearch();
    };

    updateLanguage = (v) => {
        const { updateLanguage } = this.props;
        updateLanguage(v);
    };

    updateRepoQuery = (v) => {
        const { updateRepoQuery } = this.props;
        updateRepoQuery(v);
    };

    render = () => {

        const { progress, log, language, query } = this.props;

        var label = 'READY';
        if (progress)
            label = 'IN PROGRESS';

        return (

        <React.Fragment>
            <div className={styles.row}>

                <TextField
                    label="Repository Language"
                    onChange={e => this.updateLanguage(e.target.value)}
                    value={language}
                    className={styles.text1}
                    flex={1}
                    />
                <TextField
                    label="Repository Query"
                    onChange={e => this.updateRepoQuery(e.target.value)}
                    value={query}
                    className={styles.text2}
                    />
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.btn}
                    onClick={this.performQuerySearch.bind(this)}>
                    Get
                </Button>
                

                <div className={styles.progressContainer}>
                    <CircularProgress
                        size={124}
                        thickness={2}
                        disableShrink={!progress}
                        />
                </div>


                <span className={styles.label}>
                    <Chip
                        className={progress ? styles.chipBlue : styles.chip}
                        variant="outlined"
                        color="secondary"
                        label={label}
                    />
                </span>

                </div>

                <br />

                <div className={styles.logContainer}>
                    <TextField
                      id="standard-multiline-static"
                      label="Query log"
                      multiline
                      rows="12"
                      margin="normal"
                      value={log}
                      fullWidth={true}
                      className={styles.log}
                      variant="outlined"
                    />
                </div>
            </React.Fragment>
        );
    }
}


