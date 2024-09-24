import { fromJS, Map } from 'immutable';
import types from '../constants/reportConstants';

const INITIAL_STATE = {};

const initialImmutableState = fromJS(INITIAL_STATE);

const reportReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SET_USER_COUNT:
      return state.withMutations((mutableState) => {
        mutableState.set('userCount', fromJS(action.payload));
      });
    case types.SET_ADMIN_APP_REPORT:
      return state.withMutations((mutableState) => {
        mutableState.set('adminAppReport', fromJS(action.payload));
      });
    case types.SET_BUILDING_APP_REPORT:
      return state.withMutations((mutableState) => {
        mutableState.set('buildingAppReport', fromJS(action.payload));
      });
    case types.SET_LANDLORD_APP_REPORT:
      return state.withMutations((mutableState) => {
        mutableState.set('landlordAppReport', fromJS(action.payload));
      });
    case types.SET_FLAGGED_CANCEL_REPORT:
      return state.withMutations((mutableState) => {
        mutableState.set('flaggedCancelCountReport', fromJS(action.payload));
      });
    case types.SET_BUILDING_COUNT:
      return state.withMutations((mutableState) => {
        mutableState.set('buildingCount', fromJS(action.payload));
      });
    case types.SET_LANDLORD_COUNT:
      return state.withMutations((mutableState) => {
        mutableState.set('landlordCount', fromJS(action.payload));
      });
    default:
      return state;
  }
};

export default reportReducer;
