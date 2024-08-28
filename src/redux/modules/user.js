import { fromJS, Map } from 'immutable';
import types from '../constants/userConstant';

const INITIAL_STATE = {
  active_landlord: null,
  vp: null,
  rm: null,
  pm: null,
  application: null,
  building: null,
  claim: null,
  policy: null,
  error: null,
  inviteValues: null,
  invite_landlord: null,
};

const initialImmutableState = fromJS(INITIAL_STATE);

const userReducer = (state = initialImmutableState, action = {}) => {
  switch (action.type) {
    case types.SET_INVITE_LL:
      return state.withMutations((mutableState) => {
        mutableState.set('invite_landlord', fromJS(action.payload));
      });
    case types.SET_ACTIVE_LL:
      return state.withMutations((mutableState) => {
        mutableState.set('active_landlord', fromJS(action.payload));
      });
    case types.SET_VP:
      return state.withMutations((mutableState) => {
        mutableState.set('vp', fromJS(action.payload));
      });
    case types.SET_RM:
      return state.withMutations((mutableState) => {
        mutableState.set('rm', fromJS(action.payload));
      });
    case types.SET_PM:
      return state.withMutations((mutableState) => {
        mutableState.set('pm', fromJS(action.payload));
      });
    case types.SET_LANDLORDTREE:
      return state.withMutations((mutableState) => {
        mutableState.set('landlord_tree', fromJS(action.payload));
      });
    case types.SET_VPTREE:
      return state.withMutations((mutableState) => {
        mutableState.set('vp_tree', fromJS(action.payload));
      });
    case types.SET_RMTREE:
      return state.withMutations((mutableState) => {
        mutableState.set('rm_tree', fromJS(action.payload));
      });
    case types.SET_USER_BUILDING_SEARCH:
      return state.withMutations((mutableState) => {
        mutableState.set('user_building_search', fromJS(action.payload));
      });
    case types.SET_ERR:
      return state.withMutations((mutableState) => {
        mutableState.set('error', fromJS(action.payload));
      });
    case types.SET_TREE_LOADING:
      return state.withMutations((mutableState) => {
        mutableState.set('treeloading', fromJS(action.payload));
      });
    case types.SET_USER_LIST:
      return state.withMutations((mutableState) => {
        mutableState.set('userlist', fromJS(action.payload));
      });
    default:
      return state;
  }
};

export default userReducer;
