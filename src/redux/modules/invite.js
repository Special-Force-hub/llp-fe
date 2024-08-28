import { fromJS, Map } from 'immutable';
import types from '../constants/inviteConstants';

const INITIAL_STATE = {
  inviteProperty: null,
};

const initialImmutableState = fromJS(INITIAL_STATE);

const inviteReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SET_INVITE_PROPERTY:
      return state.withMutations((mutableState) => {
        mutableState.set('inviteProperty', fromJS(action.payload));
      });

    default:
      return state;
  }
};

export default inviteReducer;
