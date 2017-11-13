import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/no-static-element-interactions */
const ClickableDiv = props => (
    <div
        onBlur={props.onBlur}
        tabIndex={0}
        disabled
        id={props.id}
        value={props.value}
        className={`clickable-div ${props.className}`}
        onClick={props.onClick}>
        { props.children }
    </div>
);

ClickableDiv.propTypes = {
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
    ]),
};

ClickableDiv.defaultProps = {
    onClick: null,
    className: '',
    value: '',
    id: '',
    children: null,
    onBlur: null,
};

export default ClickableDiv;
