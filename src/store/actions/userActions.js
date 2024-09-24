import types from '../constants/userConstant';

export const getInviteLandlordAction = (data) => ({
  type: types.GET_INVITE_LL,
  payload: data,
});

export const setInviteLandlordAction = (data) => ({
  type: types.SET_INVITE_LL,
  payload: data,
});

export const getVPAction = (data) => ({
  type: types.GET_VP,
  payload: data,
});

export const setVPAction = (data) => ({
  type: types.SET_VP,
  payload: data,
});

export const getRMAction = (data) => ({
  type: types.GET_RM,
  payload: data,
});

export const setRMAction = (data) => ({
  type: types.SET_RM,
  payload: data,
});

export const getPMAction = (data) => ({
  type: types.GET_PM,
  payload: data,
});

export const setPMAction = (data) => ({
  type: types.SET_PM,
  payload: data,
});

export const errMsg = (msg) => ({
  type: types.SET_ERR,
  payload: msg,
});

export const getUserBuildingAction = (data) => ({
  type: types.GET_USER_BUILDING,
  payload: data,
});

export const getUserAppAction = (data) => ({
  type: types.GET_USER_APP,
  payload: data,
});

export const getUserPoliciesAction = (data) => ({
  type: types.GET_USER_POLICY,
  payload: data,
});

export const getUserClaimAction = (data) => ({
  type: types.GET_USER_CLAIM,
  payload: data,
});

export const deleteUsersAction = (data) => ({
  type: types.DEL_USERS,
  payload: data,
});

export const updateUserPropertyAction = (data) => ({
  type: types.UPDATE_USER_PROPERTY,
  payload: data,
});

export const getActiveLandlordAction = () => ({
  type: types.GET_ACTIVE_LL,
});

export const setActiveLandlordAction = (data) => ({
  type: types.SET_ACTIVE_LL,
  payload: data,
});

export const deleteLandlordAction = (data) => ({
  type: types.DEL_LANDLORD,
  payload: data,
});

export const getLandlordTreeAction = (data) => ({
  type: types.GET_LANDLORDTREE,
  payload: data,
});

export const setLandlordTreeAction = (data) => ({
  type: types.SET_LANDLORDTREE,
  payload: data,
});

export const getVPTreeAction = (data) => ({
  type: types.GET_VPTREE,
  payload: data,
});

export const setVPTreeAction = (data) => ({
  type: types.SET_VPTREE,
  payload: data,
});

export const getRMTreeAction = () => ({
  type: types.GET_RMTREE,
});

export const setRMTreeAction = (data) => ({
  type: types.SET_RMTREE,
  payload: data,
});

export const getUserBuildingSearchAction = (data) => ({
  type: types.GET_USER_BUILDING_SEARCH,
  payload: data,
});

export const setUserBuildingSearchAction = (data) => ({
  type: types.SET_USER_BUILDING_SEARCH,
  payload: data,
});

export const setDelegationMoveOutAction = (data) => ({
  type: types.DELEGATION_MOVEOUT,
  payload: data,
});

export const setTreeLoadingAction = (data) => ({
  type: types.SET_TREE_LOADING,
  payload: data,
});

export const getUserListAction = () => ({
  type: types.GET_USER_LIST,
});

export const setUserListAction = (data) => ({
  type: types.SET_USER_LIST,
  payload: data,
});
