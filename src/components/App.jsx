import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const App = props => (
    <div className="app">
        <Header />
        { props.children }
        <span className="tagline">{ 'Made with ❤️ by Tom Beaufoy' }</span>
    </div>
);

App.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
