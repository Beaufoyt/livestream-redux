import React from 'react';
import PropTypes from 'prop-types';

const NavButton = props => (
    <button className={`btn btn-icon btn-nav btn-wave ${props.className}`} onClick={props.onClick}>
        { props.icon && <i className={`fa fa-${props.icon}`} /> }
        { props.label && props.label }
    </button>
);

NavButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    className: PropTypes.string,
};

NavButton.defaultProps = {
    icon: null,
    onClick: null,
    className: '',
    label: '',
};

export default NavButton;
