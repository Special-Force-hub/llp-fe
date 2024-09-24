/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { createRouterReducer } from '@lagunovsky/redux-react-router';
import history from 'utils/history';

import uiReducer from './modules/ui';
import initval from './modules/initForm';
import auth from './modules/auth';
import property from './modules/property';
import user from './modules/user';
import delegation from './modules/delegation';
import email from './modules/email';
import notification from './modules/notification';
import invite from './modules/invite';
import report from './modules/report';
import claimForm from './modules/claimForm';
import doc from './modules/doc';
import invoice from './modules/invoice';
import { combineReducers } from 'redux-immutable';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ui: uiReducer,
    initval,
    auth,
    property,
    user,
    email,
    delegation,
    notification,
    invite,
    report,
    claimForm,
    doc,
    invoice,
    router: createRouterReducer(history),
    ...injectedReducers,
  });

  return rootReducer;
  // Wrap the root reducer and return a new root reducer with router state
  // const mergeWithRouterState = createRouterReducer(history);
  // return mergeWithRouterState(rootReducer);
}
