import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import Numbers from './Numbers';
import Home from './Home';

const About = () => <section><h3 className="placeholder">About</h3><hr /></section>;
const Contact = () => <section><h3 className="placeholder">Contact</h3><hr /></section>;

const Routes = () => (
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/numbers" component={Numbers} />
        <Route path="/contact" component={Contact} />
    </App>
);

export default Routes;
