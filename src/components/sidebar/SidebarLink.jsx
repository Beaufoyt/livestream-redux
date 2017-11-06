import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SidebarLink = props => (
    <li className="sidebar-link">
        <NavLink activeClassName="active" onClick={props.onClick} className="btn btn-sidebar" to={props.to}>
            <span className="link-icon-holder">
                <i className={`fa fa-fw fa-${props.icon}`} />
            </span>
            { props.label }
        </NavLink>
    </li>
);

SidebarLink.propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

SidebarLink.defaultProps = {
    onClick: () => {},
};

export default SidebarLink;
