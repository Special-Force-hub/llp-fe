import { fromJS, Map } from 'immutable';
import types from '../constants/notifConstants';

const INITIAL_STATE = {
  successMsg: null,
  failedMsg: null,
  msgTo: null,
  msgFrom: null,
  activeTime: null,
  notifcation: null,
  active_notification: [],
};

const initialImmutableState = fromJS(INITIAL_STATE);

const notificationReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SUCCESS_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('successMsg', fromJS(action.payload));
      });
    case types.FAILED_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('failedMsg', fromJS(action.payload));
      });
    case types.SET_NOTIF_TO:
      return state.withMutations((mutableState) => {
        mutableState.set('msgTo', fromJS(action.payload));
      });
    case types.SET_NOTIF_FROM:
      return state.withMutations((mutableState) => {
        mutableState.set('msgFrom', fromJS(action.payload));
      });
    case types.SET_ACTIVITY_TIME:
      return state.withMutations((mutableState) => {
        mutableState.set('activeTime', fromJS(action.payload));
      });
    case types.SET_NOTIFICATION:
      return state.withMutations((mutableState) => {
        mutableState.set('notfication', fromJS(action.payload));
      });
    default:
      return state;
  }
};

export default notificationReducer;
