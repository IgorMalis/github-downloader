'use strict';

import React from 'react';

// Router
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';

// Views
import App from '../views/app';
import Main from '../views/main';
import Progress from '../views/progress';
import Query from '../views/query';
import Settings from '../views/settings';

const configureRouter = (history) => (
    <ConnectedRouter history={history}>
        <App>
            <Switch>
                <Route exact path="/" render={() => (<Main />)} />
                <Route path="/query/:sessionId" render={(props) => (<Query {...props} />)} />
                <Route path="/progress/:sessionId" render={(props) => (<Progress {...props} />)} /> // props is required to access props.match.params
                <Route path="/settings" render={() => (<Settings />)} />
                <Route render={() => (<div>Invalid route...</div>)} />
            </Switch>
        </App>
    </ConnectedRouter>
);

export default configureRouter;
