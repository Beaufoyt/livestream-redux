import React from 'react';
import PropTypes from 'prop-types';

const Error = props => (
    <div className={`alert alert-danger ${props.classes}`}>
        <strong>Error</strong> {props.content}
    </div>
);

Error.propTypes = {
    classes: PropTypes.string,
    content: PropTypes.string.isRequired,
};

Error.defaultProps = {
    classes: '',
};

export default Error;
