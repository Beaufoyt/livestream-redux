import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavButton = props => (
    <NavLink activeClassName="active" className="btn btn-icon btn-nav" to={props.path}>
        { props.icon && <i className={`fa fa-${props.icon}`} /> }
        {props.label}
    </NavLink>
);

NavButton.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

NavButton.defaultProps = {
    icon: null,
};

export default NavButton;
