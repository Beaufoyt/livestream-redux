import React from 'react';
import PropTypes from 'prop-types';

const ClickableDiv = props => (
    <textbox disabled className={props.className} onClick={props.onClick} />
);

ClickableDiv.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

ClickableDiv.defaultProps = {
    onClick: null,
    className: '',
};

export default ClickableDiv;
