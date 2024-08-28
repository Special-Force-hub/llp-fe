import { fromJS, Map } from 'immutable';
// import { REHYDRATE } from 'redux-persist/lib/constants';
import { INIT, CLEAR } from '../constants/reduxFormConstants';

const initialState = {
  formValues: Map(),
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state.withMutations((mutableState) => {
        mutableState.set('formValues', action.data);
      });
    case CLEAR:
      return state.withMutations((mutableState) => {
        mutableState.set('formValues', Map());
      });
    // case REHYDRATE:
    //   return { ...state, persistedState: action.payload };
    default:
      return state;
  }
}
