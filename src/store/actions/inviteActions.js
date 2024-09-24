import types from '../constants/inviteConstants';

export const inviteLandlordAction = (data) => ({
  type: types.INVITE_LANDLORD,
  payload: data,
});

export const inviteUserAction = (data) => ({
  type: types.INVITE_USER,
  payload: data,
});

export const getInvitePropertyAction = (data) => ({
  type: types.GET_INVITE_PROPERTY,
  payload: data,
});

export const setInvitePropertyAction = (data) => ({
  type: types.SET_INVITE_PROPERTY,
  payload: data,
});

export const getInvitePropertyPerUserAction = (data) => ({
  type: types.GET_INVITE_PROPERTY_PER_USER,
  payload: data,
});

export const getAdminInvitePropertyAction = (data) => ({
  type: types.GET_ADMIN_INVITE_PROPERTY,
  payload: data,
});

export const setAdminInvitePropertyAction = (data) => ({
  type: types.SET_ADMIN_INVITE_PROPERTY,
  payload: data,
});
