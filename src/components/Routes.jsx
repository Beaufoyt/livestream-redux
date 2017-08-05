import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import App from './App';
import Numbers from './Numbers';

const About = () => <section><h3 className="placeholder">About</h3></section>;
const Contact = () => <section><h3 className="placeholder">Contact</h3></section>;

const Routes = () => (
    <App>
        <Route
            exact path="/" render={() => (
                <Redirect to="numbers" />)}
        />
        <Route path="/about" component={About} />
        <Route path="/numbers" component={Numbers} />
        <Route path="/contact" component={Contact} />
    </App>
);

export default Routes;
