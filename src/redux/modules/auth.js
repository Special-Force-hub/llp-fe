import { fromJS, Map } from 'immutable';
import types from '../constants/authConstants';

const INITIAL_STATE = {
  currentUser: null,
  userInfo: null,
  error: null,

  mfaVerification: 'none',
  mfaSent: false,
  requireCaptcha: false,
};

const initialImmutableState = fromJS(INITIAL_STATE);

const authReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.USER_VERIFY_RESPONSE:
      return state.withMutations((mutableState) => {
        mutableState.set('userInfo', fromJS(action.payload));
      });
    case types.MFA_UPDATE_RESULT:
      return state.withMutations((mutableState) => {
        mutableState.set('mfaVerification', action.payload);
      });
    case types.MFA_SENT:
      return state.withMutations((mutableState) => {
        mutableState.set('mfaSent', action.payload);
        mutableState.set('mfaVerification', 'none');
      });
    case types.SET_CURRENT_USER:
      return state.withMutations((mutableState) => {
        mutableState.set('currentUser', fromJS(action.payload));
      });
    case types.LOG_IN_FAILURE:
    case types.REGISTER_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('currentUser', null);
      });
    case types.RESET_RESULT:
      return state.withMutations((mutableState) => {
        mutableState.set('resetResult', fromJS(action.payload));
      });
    case types.SET_INVITE_DATA:
      return state.withMutations((mutableState) => {
        mutableState.set('inviteData', fromJS(action.payload));
      });
    case types.SET_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', fromJS(action.payload));
      });
    case types.SET_CAPTCHA_REQUIRED:
      return state.withMutations((mutableState) => {
        mutableState.set('requireCaptcha', fromJS(action.payload));
      });
    case types.LOG_OUT:
      return initialImmutableState;
    default:
      return state;
  }
};

export default authReducer;
