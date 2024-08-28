import { api, getAuthHeader } from './help';

export const getUserCount = async () => {
  const response = await api.get('/report/usercount', getAuthHeader());
  return response.data;
};

export const getFlaggedCancelCount = async () => {
  const response = await api.get('/report/flagged-cancel-count', getAuthHeader());
  return response.data;
}

export const getAppCount = async (data) => {
  if (data) {
    const response = await api.get(
      '/report/app?buildingId=' + data.buildingId + '&landlordId=' + data.landlordId,
      getAuthHeader(),
    );
    return response.data;
  }
  const response = await api.get('/report/app', getAuthHeader());
  return response.data;
};

export const getBuildingCount = async () => {
  const response = await api.get('/report/building', getAuthHeader());
  return response.data;
};

export const getLandlordCount = async () => {
  const response = await api.get('/report/landlord', getAuthHeader());
  return response.data;
};
