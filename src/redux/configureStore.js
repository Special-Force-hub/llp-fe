/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { jwtDecode } from 'jwt-decode';

import logger from 'redux-logger';
import createReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
    const token = localStorage.getItem('token');
    if (token && jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear();
      window.location.reload();
    }
    next(action);
  };

  const middlewares = [
    sagaMiddleware,
    logger,
    checkTokenExpirationMiddleware,
    createRouterMiddleware(history),
  ];
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(createReducer({}, history), fromJS(initialState), composeEnhancers(...enhancers));

  // Extensions
  sagaMiddleware.run(rootSaga);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
