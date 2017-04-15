import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';
import 'styles/index.scss';
import 'bootstrap/dist/css/bootstrap.css';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('todo')
);
