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

import RepositoryQuery from '../components/query/repository';
import OrganizationQuery from '../components/query/organization';
import UserQuery from '../components/query/user';
import SearchQuery from '../components/query/search';

// Redux
import { connect } from 'react-redux';

// Redux - actions
import {
    updateUsername,
    updateRepo,
    performQuery,
    updateTab,
} from '../actions/query.js';

// SASS
import styles from './query.scss';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={4}>{children}</Box>
    </Typography>
  );
}


@connect(
    (state, ownProps = {}) => ({
        tab: state.query.get('tab'),
        rateVisible: state.query.get('rateVisible'),
        rateRemaining: state.query.get('rateRemaining'),
        rateTotal: state.query.get('rateTotal'),
    }),
    (dispatch, props) => ({
        updateTab: (v) => dispatch(updateTab(v)),
    }),
)
export default class Query extends React.Component {

    handleTabChange = (event, newValue) => {
        const { updateTab } = this.props;
        updateTab(newValue);
    };

    render = () => {
        const { sessionId } = this.props.match.params; //QUERYY { sessionId }

        const {
          tab,
          rateVisible,
          rateRemaining,
          rateTotal,
        } = this.props;

        return (
            <React.Fragment>
          { rateVisible &&
            <div className={styles.rateContainer}>
              <span className={styles.rateNum}>{rateRemaining}</span>
              <span className={styles.rateDiv}>/</span>
              <span className={styles.rateDenom}>{rateTotal}</span>
            </div>
          }
        <Tabs value={tab} onChange={this.handleTabChange.bind(this)} aria-label="simple tabs example">
          <Tab label="Repository" />
          <Tab label="Organization" />
          <Tab label="User" />
          <Tab label="Search" />
        </Tabs>
        <TabPanel value={tab} index={0}>
                <RepositoryQuery />

              </TabPanel>
                

                <TabPanel value={tab} index={1}>
                  <OrganizationQuery />
              </TabPanel>

                <TabPanel value={tab} index={2}>
                <UserQuery />
              </TabPanel>
              <TabPanel value={tab} index={3}>
                <SearchQuery />
              </TabPanel>
            </React.Fragment>
        );
    }
}
