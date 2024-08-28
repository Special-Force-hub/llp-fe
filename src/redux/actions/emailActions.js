import types from '../constants/emailConstants';

export const getEmailAction = () => ({
  type: types.GET_EMAIL,
});

export const setEmailAction = (data) => ({
  type: types.SET_EMAIL,
  payload: data,
});

export const deleteEmailAction = (data) => ({
  type: types.DEL_EMAIL,
  payload: data,
});

export const sendLandlordInviteEmailAction = (data) => ({
  type: types.INVITE_LANDLORD,
  payload: data,
});
