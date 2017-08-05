import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const App = props => (
    <div className="app">
        <Header />
        { props.children }
    </div>
);

App.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
