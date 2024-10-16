import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import configureStore from './store/configureStore';
import history from 'utils/history';

import { createGlobalStyle } from 'styled-components';
import { global } from '@leapeasy/ui-kit';
const GlobalStyle = createGlobalStyle`${global.GlobalStyle}`;

const root = ReactDOM.createRoot(document.getElementById('root'));

const initialState = {};
const store = configureStore(initialState, history);

root.render(
  <Provider store={store}>
    <ReduxRouter history={history} routerSelector={(state) => state.toJS().router}>
      <GlobalStyle />
      <App />
    </ReduxRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
