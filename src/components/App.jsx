import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleSidebar } from '../actions/sidebar';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import ClickableDiv from './utils/ClickableDiv';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import LoginOverlay from './LoginOverlay';
import RegisterOverlay from './RegisterOverlay';

const App = props => (
    <div className="app">
        <Sidebar />
        <Header />
        <LoginOverlay />
        <RegisterOverlay />
        <div className={`app-content ${!props.isMobile && props.isSidebarOpen ? '' : 'wide'}`} >
            <Breadcrumbs />
            { props.children }
            <span className="tagline">Made with&nbsp;<span className="heart" />&nbsp;by Tom Beaufoy</span>
            { props.isMobile &&
                <ClickableDiv
                    onClick={() => props.toggleSidebar(false)}
                    className={`content-overlay ${props.isSidebarOpen ? 'visible' : ''}`} /> }
        </div>
    </div>
);

const mapStateToProps = state => ({
    isSidebarOpen: state.sidebar.isOpen,
    isMobile: state.ui.isMobile,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleSidebar }, dispatch)
);

App.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
