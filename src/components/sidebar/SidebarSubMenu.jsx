import React from 'react';
import PropTypes from 'prop-types';

const BrandLogo = props => (
    <li className="sidebar-link sub-menu">
        <button
            id={props.id}
            className={`btn ${props.isSubMenuLinkActive(props.id) ? 'active' : ''}`}
            onClick={props.expandSubMenu}>
            <span className="pull-right overflow-icon">
                <i className={`fa fa-chevron-${props.isOpen(props.id) ? 'down' : 'left'}`} />
            </span>
            <span className="link-icon-holder">
                <i className={`fa fa-fw fa-${props.icon}`} />
            </span>
            { props.label }
        </button>
        { props.isOpen(props.id) &&
        <ul className="sidebar-links sub-menu-links">
            { props.children }
        </ul> }
    </li>
);

BrandLogo.propTypes = {
    expandSubMenu: PropTypes.func.isRequired,
    isSubMenuLinkActive: PropTypes.func.isRequired,
    isOpen: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

BrandLogo.defaultProps = {
    children: [],
};

export default BrandLogo;
