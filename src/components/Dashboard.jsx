import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

export class Numbers extends PureComponent {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    }

    componentWillMount() {
    }

    render() {
        return (
            <section>
                <h3>Dashboard</h3>
                <hr />
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.numbers.get('count'),
        factIsRequesting: state.numbers.get('factIsRequesting'),
        fact: state.numbers.get('fact'),
        factError: state.numbers.get('factError'),
    };
};

export default connect(mapStateToProps)(Numbers);
