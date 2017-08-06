import React from 'react';
import PropTypes from 'prop-types';

const CounterButton = props => (
    <button
        className="btn btn-default btn-counter"
        onClick={props.onClick}
        value={props.value}>
        {props.label}
    </button>
);

CounterButton.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CounterButton;
