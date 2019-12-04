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
    updateUser,
    performQueryUser,
} from '../../actions/query.js';

// SASS
import styles from './query.scss';


@connect(
    (state, ownProps = {}) => ({
        user: state.query.get('user'),
        progress: state.query.get('progress'),
        log: state.log.get('text'),
        tab: state.query.get('tab'),
    }),
    (dispatch, props) => ({
        performQuery: () => dispatch(performQueryUser()),
        updateUser: (v) => dispatch(updateUser(v)),
    }),
)
export default class UserQuery extends React.Component {

    performQuery = () => {
        const { performQuery } = this.props;
        performQuery();
    };

    updateUser = (v) => {
        const { updateUser } = this.props;
        updateUser(v);
    };

    render = () => {

        const { user, progress, log } = this.props;

        var label = 'READY';
        if (progress)
            label = 'IN PROGRESS';

        return (

        <React.Fragment>
            <div className={styles.row}>

                <TextField
                    label="GitHub User"
                    onChange={e => this.updateUser(e.target.value)}
                    value={user}
                    className={styles.text}
                    flex={1}
                    />
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.btn}
                    onClick={this.performQuery.bind(this)}>
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


