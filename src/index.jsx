// @ts-check
import React from 'react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';

import '../assets/application.scss';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App.jsx';
import store from './store.js';

const socket = io();
ReactDOM.render(
  <Provider store={store}>
    <App socket={socket}/>
  </Provider>,
  document.getElementById('chat'),
);
