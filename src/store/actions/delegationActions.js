import types from '../constants/delegationConstants';

export const inviteSuccess = () => ({
  type: types.INVITE_SUCCESS,
});

export const inviteFailed = (message) => ({
  type: types.INVITE_FAILED,
  payload: message,
});

export const getRequestBuildingAction = (data) => ({
  type: types.GET_REQUEST_BUILDING,
  payload: data,
});

export const setRequestBuildingAction = (data) => ({
  type: types.SET_REQUEST_BUILDING,
  payload: data,
});

export const getRequestLandlordAction = () => ({
  type: types.GET_REQUEST_LANDLORD,
});

export const setRequestLandlordAction = (data) => ({
  type: types.SET_REQUEST_LANDLORD,
  payload: data,
});

export const sendPropertyRequestAction = (data) => ({
  type: types.SEND_PROPERTY_REQUEST,
  payload: data,
});

export const getRequestVPAction = () => ({
  type: types.GET_REQUEST_VP,
});

export const setRequestVPAction = (data) => ({
  type: types.SET_REQUEST_VP,
  payload: data,
});

export const getRequestUserPropertyAction = (data) => ({
  type: types.GET_RQUEST_USER_PROPERTY,
  payload: data,
});

export const setRequestUserPropertyAction = (data) => ({
  type: types.SET_RQUEST_USER_PROPERTY,
  payload: data,
});
