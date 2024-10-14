import { api, getAuthHeader } from './help';

export const getBuilding = async (payload) => {
  const response = await api.post('/property/buildings', payload, getAuthHeader());
  return response.data;
};

export const getApp = async (buildingId) => {
  const response = await api.get('/property/application?buildingId=' + buildingId, getAuthHeader());
  return response.data;
};

export const getClaim = async (buildingId) => {
  const response = await api.get('/property/claim?buildingId=' + buildingId, getAuthHeader());
  return response.data;
};

export const getPolicy = async (data) => {
  const response = await api.post('/property/policy', data, getAuthHeader());
  return response.data;
};

export const cancelPolicies = async (data) => {
  const response = await api.post('/property/cancel-policy', data, getAuthHeader());
  return response.data;
};

export const getFilteredApp = async (data) => {
  const response = await api.post('/property/filterApp', data, getAuthHeader());
  return response.data;
};

export const getSearchDBResult = async (data) => {
  const response = await api.post('/property/searchDB', data, getAuthHeader());
  return response.data;
};

export const getBuildingDelegation = async (data) => {
  const response = await api.get('/property/delegation?id=' + data, getAuthHeader());
  return response.data;
};

export const getBuildingInvoice = async (data) => {
  const response = await api.get('/property/invoice?id=' + data, getAuthHeader());
  return response.data;
};

export const getPolicyCancelLogs = async () => {
  const response = await api.get('/property/cancel-logs', getAuthHeader());
  return response.data;
};

export const getPolicyByRiderId = async (riderId) => {
  const response = await api.get('/property/policy/' + riderId, getAuthHeader());
  return response.data;
};
