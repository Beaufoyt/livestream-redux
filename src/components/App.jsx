import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

const App = props => (
    <div className="app">
        <Sidebar />
        <Header />
        <div className={`app-content ${props.isSidebarOpen ? '' : 'wide'}`} >
            <Breadcrumbs />
            { props.children }
        </div>
    </div>
);

const mapStateToProps = state => ({
    isSidebarOpen: state.sidebar.get('isOpen'),
});

App.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
