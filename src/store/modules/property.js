import { fromJS, Map } from 'immutable';
import types from '../constants/propertyConstant';

const INITIAL_STATE = {};

const initialImmutableState = fromJS(INITIAL_STATE);

const propertyReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SET_BUILDING:
      return state.withMutations((mutableState) => {
        mutableState.set('building', fromJS(action.payload));
      });
    case types.SET_APP:
      return state.withMutations((mutableState) => {
        mutableState.set('application', fromJS(action.payload));
      });
    case types.SET_CLAIM:
      return state.withMutations((mutableState) => {
        mutableState.set('claim', fromJS(action.payload));
      });
    case types.SET_POLICY:
      return state.withMutations((mutableState) => {
        mutableState.set('policy', fromJS(action.payload));
      });
    case types.SET_POLICY_CANCEL:
      return state.withMutations((mutableState) => {
        mutableState.set('policy-cancel', fromJS(action.payload));
      });
    case types.SET_ERR:
      return state.withMutations((mutableState) => {
        mutableState.set('error', fromJS(action.payload));
      });
    case types.SET_BUILDING_DELEGATION:
      return state.withMutations((mutableState) => {
        mutableState.set('delegation', fromJS(action.payload));
      });
    case types.SET_BUILDING_INVOICE:
      return state.withMutations((mutableState) => {
        mutableState.set('invoice', fromJS(action.payload));
      });
    case types.SET_POLICY_CANCEL_LOGS:
      return state.withMutations((mutableState) => {
        mutableState.set('policy-cancel-logs', fromJS(action.payload));
      });
    default:
      return state;
  }
};

export default propertyReducer;
