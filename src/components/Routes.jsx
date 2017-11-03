import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import App from './App';
import Dashboard from './Dashboard';

const Palette = () => (
    <section>
        <h3>Palette</h3>
        <hr />
    </section>
);

const Workbench = () => (
    <section>
        <h3>Workbench</h3>
        <hr />
    </section>
);

const Routes = () => (
    <App>
        <Route
            exact
            path="/"
            render={() => (<Redirect to="/dashboard" />)} />
        <Route path="/dashboard" component={Dashboard} />
        <Route
            exact
            path="/tools"
            render={() => (<Redirect to="/tools/workbench" />)} />
        <Route path="/tools/workbench" component={Workbench} />
        <Route path="/tools/palette" component={Palette} />
    </App>
);

export default Routes;