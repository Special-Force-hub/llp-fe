import types from '../constants/reportConstants';

export const getUserCountAction = () => ({
  type: types.GET_USER_COUNT,
});

export const setUserCountAction = (data) => ({
  type: types.SET_USER_COUNT,
  payload: data,
});

export const getAppReportAction = (data) => ({
  type: types.GET_APP_REPORT,
  payload: data,
});

export const setAdminAppReportAction = (data) => ({
  type: types.SET_ADMIN_APP_REPORT,
  payload: data,
});

export const setBuildingAppReportAction = (data) => ({
  type: types.SET_BUILDING_APP_REPORT,
  payload: data,
});

export const setLandlordAppReportAction = (data) => ({
  type: types.SET_LANDLORD_APP_REPORT,
  payload: data,
});

export const setFlaggedCancelReportAction = (data) => ({
  type: types.SET_FLAGGED_CANCEL_REPORT,
  payload: data,
});

export const getFlaggedCancelReportAction = (data) => ({
  type: types.GET_FLAGGED_CANCEL_REPORT,
  payload: data,
});

export const getBuildingCountAction = () => ({
  type: types.GET_BUILDING_COUNT,
});

export const setBuildingCountAction = (data) => ({
  type: types.SET_BUILDING_COUNT,
  payload: data,
});

export const getLandlordCountAction = () => ({
  type: types.GET_LANDLORD_COUNT,
});

export const setLandlordCountAction = (data) => ({
  type: types.SET_LANDLORD_COUNT,
  payload: data,
});

export const getUserReportAction = (data) => ({
  type: types.GET_USER_REPORT,
  payload: data,
});
