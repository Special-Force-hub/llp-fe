import { api, getAuthHeader } from './help';

export const sendPropertyRequest = async (data) => {
  const response = await api.post('/delegation/request-property', data, getAuthHeader());
  return response.data;
};

export const getRequestLandlord = async () => {
  const response = await api.get('/delegation/request-landlord', getAuthHeader());
  return response.data;
};

export const getRequestVP = async () => {
  const response = await api.get('/delegation/request-vp', getAuthHeader());
  return response.data;
};

export const getRequestBuilding = async () => {
  const response = await api.get('/delegation/request-building', getAuthHeader());
  return response.data;
};

export const getRequestUserProperty = async (data) => {
  const response = await api.post('/delegation/request-userproperty', data, getAuthHeader());
  return response.data;
};
