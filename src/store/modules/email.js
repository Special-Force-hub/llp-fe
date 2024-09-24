import { fromJS, Map } from 'immutable';
import types from '../constants/emailConstants';

const initialState = {
  data: null,
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case types.SET_EMAIL:
      return state.withMutations((mutableState) => {
        mutableState.set('data', fromJS(action.payload));
      });
    default:
      return state;
  }
}
