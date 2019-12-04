'use strict';

// Components
import React from 'react';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import DrawerMenu from '../components/drawer';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tooltip from '@material-ui/core/Tooltip';


// Redux
import { connect } from 'react-redux';

// Redux - actions
import { toggle } from '../actions/drawer.js';

// SASS
import styles from './app.scss';


@connect(
    (state, ownProps = {}) => ({
        drawerOpen: state.drawer.get('open'),
        connected: state.websocket.get('connected'),
    }),
    (dispatch, props) => ({
        drawerToggle: () => dispatch(toggle()),
    }),
)
export default class App extends React.Component {
    drawerButtonClick = () => {
        const { drawerToggle } = this.props;
        drawerToggle();
    };

    render = () => {
        const { drawerOpen, connected } = this.props;

        return (
            <Container className={styles.container}>

                <AppBar position="static" className={styles.appbar}>
                    <Toolbar className={styles.toolbar}>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={this.drawerButtonClick.bind(this)}>
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h5" align="center" display="block" className={styles.title}>
                        GitHub Downloader
                      </Typography>
                      <Tooltip title="Websocket OFFLINE" visibility={!connected ? 'visible' : 'hidden'}>
                        <ErrorOutlineIcon color="error" />
                      </Tooltip>
                    </Toolbar>
                </AppBar>

                {this.props.children}

                 <DrawerMenu />

            </Container>
        );
    }
}
