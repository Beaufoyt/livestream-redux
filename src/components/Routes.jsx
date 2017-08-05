import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import App from './App';
import Numbers from './Numbers';

const About = () => <h1 className="placeholder">This is the about page</h1>;
const Contact = () => <h1 className="placeholder">This is the contact page</h1>;

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
