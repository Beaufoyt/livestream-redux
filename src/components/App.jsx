import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

const App = props => (
    <div className="app">
        <Sidebar />
        <div className="header-content" >
            <Header />
            <Breadcrumbs />
            { props.children }
        </div>
    </div>
);

App.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
