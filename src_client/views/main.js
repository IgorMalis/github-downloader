'use strict';

// Components
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Redux
import { connect } from 'react-redux';

// SASS
import styles from './main.scss';

import {
    query,
} from '../actions/router';


@connect(null,
    (dispatch, props) => ({
        beginSession: (n) => dispatch(query(n)),
    }),
)
export default class Main extends React.Component {

    session = () => {
        const { beginSession } = this.props;
        beginSession(1);
    };

    render = () => {
        return (
            <div className={styles.container}>

                <Typography className={styles.text}>Welcome to GitHub Downloader!</Typography>
                <Button
                  className={styles.btn}
                  variant="contained"
                  color="secondary"
                  onClick={this.session.bind(this)}>
                    Click here to begin a new session
                </Button>
            </div>
        );
    }
}
