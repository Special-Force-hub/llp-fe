import types from '../constants/documentConstants';

export const getDocTitleAction = (data) => ({
  type: types.GET_DOCTITLE,
  payload: data,
});

export const getDocFileAction = (data) => ({
  type: types.GET_DOCFILE,
  payload: data,
});

export const setDocTitleAction = (data) => ({
  type: types.SET_DOCTITLE,
  payload: data,
});

export const setDocFileAction = (data) => ({
  type: types.SET_DOCFILE,
  payload: data,
});

export const setErrorAction = (data) => ({
  type: types.SET_ERR,
  payload: data,
});

export const setActiveNotificationAction = (data) => ({
  type: types.SET_ACTIVE_NOTIFICATION,
  payload: data,
});

export const setDocLoadingAction = (data) => ({
  type: types.SET_DOC_LOADING,
  payload: data,
});
