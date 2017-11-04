import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleSidebar } from '../actions/sidebar';

import HeaderButton from './HeaderButton';
import BrandLogo from './BrandLogo';

const Header = props => (
    <div className="header">
        <BrandLogo />
        <HeaderButton
            onClick={() => props.toggleSidebar(!props.isSidebarOpen)}
            icon="bars"
            className="pull-left btn-sidebar-toggle" />
        <HeaderButton label="Register" icon="pencil" className="pull-right" />
        <HeaderButton label="Log in" icon="sign-in" className="pull-right" />
    </div>
);

Header.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isSidebarOpen: state.sidebar.get('isOpen'),
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleSidebar }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
