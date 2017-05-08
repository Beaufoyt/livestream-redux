import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import rootReducer from './reducers';
import './styles/index.scss';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

render(
  <Router history={browserHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('todo'),
);
