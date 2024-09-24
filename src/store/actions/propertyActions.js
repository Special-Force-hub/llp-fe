import types from '../constants/propertyConstant';

export const getBuildingAction = (data) => ({
  type: types.GET_BUILDING,
  payload: data,
});

export const setBuildingAction = (data) => ({
  type: types.SET_BUILDING,
  payload: data,
});

export const getAppAction = (data) => ({
  type: types.GET_APP,
  payload: data,
});

export const setAppAction = (data) => ({
  type: types.SET_APP,
  payload: data,
});

export const getClaimAction = (data) => ({
  type: types.GET_CLAIM,
  payload: data,
});

export const setClaimAction = (data) => ({
  type: types.SET_CLAIM,
  payload: data,
});

export const getPolicyAction = (data) => ({
  type: types.GET_POLICY,
  payload: data,
});

export const setPolicyAction = (data) => ({
  type: types.SET_POLICY,
  payload: data,
});

export const getPolicyCancelAction = (data) => ({
  type: types.GET_POLICY_CANCEL,
  payload: data,
});

export const setPolicyCancelAction = (data) => ({
  type: types.SET_POLICY_CANCEL,
  payload: data,
});

export const cancelPoliciesAction = (data) => ({
  type: types.CANCEL_POLICIES,
  payload: data,
});

export const errMsg = (msg) => ({
  type: types.SET_ERR,
  payload: msg,
});

export const getFilteredDataAction = (data) => ({
  type: types.FILTER_DATA,
  payload: data,
});

export const searchDBAction = (data) => ({
  type: types.SEARCH_DB,
  payload: data,
});

export const getBuildingDelegationAction = (data) => ({
  type: types.GET_BUILDING_DELEGATION,
  payload: data,
});

export const setBuildingDelegationAction = (data) => ({
  type: types.SET_BUILDING_DELEGATION,
  payload: data,
});

export const getBuildingInvoiceAction = (data) => ({
  type: types.GET_BUILDING_INVOICE,
  payload: data,
});

export const setBuildingInvoiceAction = (data) => ({
  type: types.SET_BUILDING_INVOICE,
  payload: data,
});

export const setPolicyCancelLogsAction = (data) => ({
  type: types.SET_POLICY_CANCEL_LOGS,
  payload: data,
});

export const getPolicyCancelLogsAction = (data) => ({
  type: types.GET_POLICY_CANCEL_LOGS,
  payload: data,
});
