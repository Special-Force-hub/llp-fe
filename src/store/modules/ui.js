import { fromJS } from 'immutable';
import { OPEN_MENU, OPEN_DETAILS, SET_COLLAPSED } from '../constants/uiConstants';

const initialState = {
  menuItem: null,
  details: null,
  collapsed: false,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SET_COLLAPSED:
      return state.withMutations((mutableState) => {
        mutableState.set('collapsed', fromJS(action.payload));
      });
    case OPEN_MENU:
      return state.withMutations((mutableState) => {
        mutableState.set('menuItem', fromJS(action.payload));
        mutableState.set('details', null);
      });
    case OPEN_DETAILS:
      return state.withMutations((mutableState) => {
        mutableState.set('details', fromJS(action.payload));
      });
    default:
      return state;
  }
}
