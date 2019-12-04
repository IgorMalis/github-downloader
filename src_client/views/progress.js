'use strict';

// Components
import React from 'react';

// Redux
import { connect } from 'react-redux';

// SASS
import styles from './progress.scss';


@connect(
    () => ({}),
    (dispatch, props) => ({
        testAction: () => dispatch(test()),
    }),
)
export default class Progress extends React.Component {

    componentDidMount = () => {
        console.log('progress mounted!');
    };

    render = () => {
        const { sessionId } = this.props.match.params;

        return (
            <React.Fragment>

                PROGRESS { sessionId }
                
            </React.Fragment>
        );
    };
}
