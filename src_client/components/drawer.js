'use strict';

// Components
import React from 'react';
import Button from '@material-ui/core/Button';
import { AccessAlarm, ThreeDRotation, ChevronLeft, Settings, AddCircleOutline, Description, Search } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Redux
import { connect } from 'react-redux';

// Redux - actions
import { toggle } from '../actions/drawer.js';
import { settings, query, progress } from '../actions/router.js';

// SASS
import styles from './drawer.scss';


@connect(
    (state, ownProps = {}) => ({
        drawerOpen: state.drawer.get('open'),
        sessions: state.sessions.get('sessions'),
        currentSession: state.sessions.get('current'),
    }),
    (dispatch, props) => ({
        drawerToggle: () => dispatch(toggle()),
        navigateSettings: () => dispatch(settings()),
        navigateQuery: (id) => dispatch(query(id)),
        navigateProgress: (id) => dispatch(progress(id)),
    }),
)
export default class DrawerMenu extends React.Component {
    drawerButtonClick = () => {
        const { drawerToggle } = this.props;
        drawerToggle();
    };

    navigateSettingsClick = () => {
        const { navigateSettings, drawerToggle } = this.props;
        navigateSettings();
        drawerToggle();
    };

    navigateSearchClick = () => {
        const { navigateQuery, drawerToggle } = this.props;
        navigateQuery(1);
        drawerToggle();
    };
    
    navigateQueryClick = (id) => {
        const { navigateQuery, drawerToggle } = this.props;
        navigateQuery(id);
        drawerToggle();
    };

    navigateProgressClick = (id) => {
        const { navigateProgress, drawerToggle } = this.props;
        navigateProgress(id);
        drawerToggle();
    };


    render = () => {
        const { drawerOpen, sessions, currentSession } = this.props;

        return (
          <Drawer
            variant="persistent"
            anchor="left"
            open={drawerOpen}>

            <div className={styles.container}>
              <IconButton
                onClick={this.drawerButtonClick.bind(this)}
                className={styles.header}>
                <ChevronLeft />
              </IconButton>
              <Typography variant="h5" gutterBottom className={styles.header}>
                Settings
              </Typography>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.contentContainer}>
                {/*
                <Typography variant="h6" gutterBottom className={styles.subheading}>
                    Sessions
                </Typography>

                <List className={styles.sessionList} component="nav" aria-label="main mailbox folders" dense={true}>
                    <ListItem className={styles.session} button>
                        <ListItemIcon><AddCircleOutline /></ListItemIcon>
                      <ListItemText primary="CREATE NEW" />
                    </ListItem>

                    {sessions.map( session => (
                         <ListItem className={styles.session} key={ session.get('id') } button onClick={() => { this.navigateQueryClick(session.get('id')); }}>
                            <ListItemIcon><Description /></ListItemIcon>
                          <ListItemText primary={session.get('label')} />
                        </ListItem>
                    ))}

                </List>

                <Divider />
                */}

                <List className={styles.upperIcons} component="nav" aria-label="main mailbox folders">
                    <ListItem className={styles.btn} button onClick={this.navigateSearchClick.bind(this)}>
                      <ListItemIcon><Search /></ListItemIcon>
                      <ListItemText primary="Search" />
                    </ListItem>
                </List>

                <Divider />

                <List className={styles.lowerIcons} component="nav" aria-label="main mailbox folders">
                    <ListItem className={styles.btn} button onClick={this.navigateSettingsClick.bind(this)}>
                      <ListItemIcon><Settings /></ListItemIcon>
                      <ListItemText primary="Preferences" />
                    </ListItem>
                </List>

            </div>
          </Drawer>
        );
    }
}
