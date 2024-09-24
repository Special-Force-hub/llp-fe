import types from '../constants/notifConstants';

export const successNotif = (msg) => ({
  type: types.SUCCESS_NOTIF,
  payload: msg,
});

export const failedNotif = (msg) => ({
  type: types.FAILED_NOTIF,
  payload: msg,
});

export const getNotifFromAction = () => ({
  type: types.GET_NOTIF_FROM,
});

export const setNotifFromAction = (data) => ({
  type: types.SET_NOTIF_FROM,
  payload: data,
});

export const getNotifToAction = () => ({
  type: types.GET_NOTIF_TO,
});

export const setNotifToAction = (data) => ({
  type: types.SET_NOTIF_TO,
  payload: data,
});

export const acceptRequestAction = (data) => ({
  type: types.ACCEPT_REQUEST,
  payload: data,
});

export const declineRequestAction = (data) => ({
  type: types.DECLINE_REQUEST,
  payload: data,
});

export const deleteRequestAction = (data) => ({
  type: types.DELETE_REQUEST,
  payload: data,
});

export const setNotificationActivityAction = () => ({
  type: types.SET_NOTIF_ACTIVITY,
});

export const setActivityTimeAction = (data) => ({
  type: types.SET_ACTIVITY_TIME,
  payload: data,
});

export const getNotificationAction = () => ({
  type: types.GET_NOTIFICATION,
});

export const setNotificationAction = () => ({
  type: types.SET_NOTIFICATION,
});
