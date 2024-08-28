import { api, getAuthHeader } from './help';

export const getLandlord = async (data) => {
  const response = await api.get('/claim/landlord?state=' + data.state);
  return response.data;
};

export const getProperty = async (data) => {
  const response = await api.get(
    '/claim/property?state=' + data.state + '&landlordId=' + data.landlordId,
  );
  return response.data;
};

export const getRider = async (data) => {
  const response = await api.get('/claim/rider?propertyId=' + data.propertyId);
  return response.data;
};

export const createClaim = async (data) => {
  console.log(data);
  const response = await api.post('/claim/create', data);
  return response.data;
};

export const checkPolicyDuplicated = async (data) => {
  const response = await api.post('/claim/policy-duplicated', data);
  return response.data;
};
