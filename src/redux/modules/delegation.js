import { fromJS, Map } from 'immutable';
import types from '../constants/delegationConstants';

const INITIAL_STATE = {
  inviteProperty: null,
  requestBuilding: null,
  requestUser: null,
  requestLandlord: null,
  requestVP: null,
  requestUserProperty: null,
};

const initialImmutableState = fromJS(INITIAL_STATE);

const inviteReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SET_REQUEST_LANDLORD:
      return state.withMutations((mutableState) => {
        mutableState.set('requestLandlord', fromJS(action.payload));
      });
    case types.SET_REQUEST_USER:
      return state.withMutations((mutableState) => {
        mutableState.set('requestUser', fromJS(action.payload));
      });
    case types.SET_REQUEST_VP:
      return state.withMutations((mutableState) => {
        mutableState.set('requestVP', fromJS(action.payload));
      });
    case types.SET_REQUEST_BUILDING:
      return state.withMutations((mutableState) => {
        mutableState.set('requestBuilding', fromJS(action.payload));
      });
    case types.SET_RQUEST_USER_PROPERTY:
      return state.withMutations((mutableState) => {
        mutableState.set('requestUserProperty', fromJS(action.payload));
      });

    default:
      return state;
  }
};

export default inviteReducer;
