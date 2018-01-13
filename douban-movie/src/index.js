import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import App from './containers/App';
import store from './Store';

ReactDOM.render(
  /* eslint-disable react/jsx-filename-extension */
  <Provider store={store}>
    <App />
  </Provider>,
  /* eslint-disable no-undef */
  document.getElementById('root'),
);
