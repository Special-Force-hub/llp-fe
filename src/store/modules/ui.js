import { fromJS, List } from 'immutable';
import { OPEN_MENU } from '../constants/uiConstants';

const initialState = {
  menuItem: null,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case OPEN_MENU:
      return state.withMutations((mutableState) => {
        mutableState.set('menuItem', fromJS(action.payload));
      });
    default:
      return state;
  }
}
