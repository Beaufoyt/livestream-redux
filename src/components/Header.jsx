import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleSidebar } from '../actions/sidebar';
import { toggleOverlay } from '../actions/overlays';
import { overlays } from '../constants/Overlays';

import HeaderButton from './HeaderButton';
import BrandLogo from './BrandLogo';

const Header = props => (
    <div className="header">
        <BrandLogo />
        <HeaderButton
            onClick={() => props.toggleSidebar(!props.isSidebarOpen)}
            icon="bars"
            className="pull-left btn-sidebar-toggle" />
        <HeaderButton
            onClick={() => props.toggleOverlay(overlays.register, true)}
            label="Register"
            icon="pencil"
            className="pull-right" />
        <HeaderButton
            label="Log in"
            onClick={() => props.toggleOverlay(overlays.login, true)}
            icon="sign-in"
            className="pull-right" />
    </div>
);

Header.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    toggleOverlay: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isSidebarOpen: state.sidebar.isOpen,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleSidebar, toggleOverlay }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
