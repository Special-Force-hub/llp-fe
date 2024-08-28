import { api, getAuthHeader } from './help';

export const getToMsg = async () => {
  const response = await api.get('/notification/to', getAuthHeader());
  return response.data;
};

export const getFromMsg = async () => {
  const response = await api.get('/notification/from', getAuthHeader());
  return response.data;
};

export const acceptRequest = async (data) => {
  const response = await api.get(
    '/notification/accept?id=' + data.id + '&type=' + data.type,
    getAuthHeader(),
  );
  return response.data;
};

export const declineRequest = async (data) => {
  const response = await api.post('/notification/decline', data, getAuthHeader());
  return response.data;
};

export const deleteRequest = async (data) => {
  const response = await api.delete('/notification?id=' + data, getAuthHeader());
  return response.data;
};

export const setNotificationActivity = async () => {
  const response = await api.get('/notification/activity', getAuthHeader());
  return response.data;
};

export const getNotification = async () => {
  const response = await api.get('/notification', getAuthHeader());
  return response.data;
};
