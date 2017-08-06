import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToCount, fetchFact } from '../actions/numbers';

import PureComponent from './PureComponent';
import CounterButton from './CounterButton';
import CodeBlock from './CodeBlock';
import Error from './Error';

export class Numbers extends PureComponent {
    static propTypes = {
        count: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired,
        factIsRequesting: PropTypes.bool.isRequired,
        fact: PropTypes.string.isRequired,
        factError: PropTypes.bool.isRequired,
    }

    componentWillMount() {
        this.fetchNewFact();
    }

    fetchNewFact = () => {
        this.props.dispatch(fetchFact());
    }

    handleCounterPress = (e) => {
        this.props.dispatch(addToCount(parseInt(e.target.value, 10)));
    }

    renderRefreshIcon = () => {
        const icon = this.props.factIsRequesting ? 'spinner fa-spin' : 'refresh';

        return <i className={`fa fa-${icon}`} />;
    }

    render() {
        return (
            <section>
                <h3>Numbers</h3>
                <hr />
                <div className="row">
                    <h5 className="row-header">Number Fact</h5>
                    <h6>Random number fact from the numbers api</h6>
                    <button
                        onClick={this.fetchNewFact}
                        className={`btn btn-refresh btn-${this.props.factIsRequesting ? 'warning' : 'success'}`}>
                        { this.renderRefreshIcon() }
                    </button>
                    <CodeBlock classes="number-fact-code" content={this.props.fact} />
                    { this.props.factError &&
                        <Error classes="numbers-error" content="fetching your juicy number fact" /> }
                </div>
                <div className="row">
                    <h5 className="row-header">Counter</h5>
                    <CounterButton value={-1} onAdd={this.handleCounterPress} label="-" />
                    <CodeBlock classes="wrap" content={this.props.count.toString()} />
                    <CounterButton value={1} onAdd={this.handleCounterPress} label="+" />
                </div>
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
