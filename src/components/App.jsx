import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleSidebar } from '../actions/sidebar';

import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import ClickableDiv from './utils/ClickableDiv';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import StripLoader from './loaders/StripLoader';
import LoginOverlay from './LoginOverlay';
import RegisterOverlay from './RegisterOverlay';
import PureComponent from './PureComponent';

class App extends PureComponent {

    closeSidebar = () => {
        this.props.toggleSidebar(false);
    }

    render() {
        return (
            <div className="app">
                <StripLoader />
                <Sidebar />
                <Header />
                <LoginOverlay />
                <RegisterOverlay />
                <div className={`app-content ${!this.props.isMobile && this.props.isSidebarOpen ? '' : 'wide'}`} >
                    <Breadcrumbs />
                    { this.props.children }
                    <span className="tagline">Made with&nbsp;<span className="heart" />&nbsp;by Tom Beaufoy</span>
                    { this.props.isMobile &&
                        <ClickableDiv
                            onClick={this.closeSidebar}
                            className={`content-overlay ${this.props.isSidebarOpen ? 'visible' : ''}`} /> }
                </div>
            </div>
        );
    }
}

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
