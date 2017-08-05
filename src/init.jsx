import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './store/configureStore';
import './styles/index.scss';

import Routes from './components/Routes';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Routes />
        </Router>
    </Provider>,
  document.getElementById('numbers'),
);
