import { api, getAuthHeader } from './help';

export const getBuilding = async (data) => {
  const { id, role } = data;
  let response;
  if (role !== 'll') {
    response = await api.post('/user/get/buildings', { data: id }, getAuthHeader());
  } else {
    response = await api.get('/user/buildings?landlordId=' + id, getAuthHeader());
  }
  return response.data;
};

export const getUserApp = async (data) => {
  const { id, role } = data;
  let response;
  if (role !== 'll') {
    response = await api.get('/user/applications?buildingId=' + id, getAuthHeader());
  } else {
    response = await api.get('/user/applications?landlordId=' + id, getAuthHeader());
  }
  return response.data;
};

export const getUserPolicy = async (data) => {
  const { id, role } = data;
  let response;
  if (role !== 'll') {
    response = await api.get('/user/policies?buildingId=' + id, getAuthHeader());
  } else {
    response = await api.get('/user/policies?landlordId=' + id, getAuthHeader());
  }
  return response.data;
};

export const getUserClaim = async (data) => {
  const { id, role } = data;
  let response;
  if (role !== 'll') {
    response = await api.get('/user/claims?buildingId=' + id, getAuthHeader());
  } else {
    response = await api.get('/user/claims?landlordId=' + id, getAuthHeader());
  }
  return response.data;
};

export const getInviteLandlord = async (payload) => {
  const response = await api.get(`/user/invite-landlords?type=${payload.type}`, getAuthHeader());
  return response.data;
};

export const getActiveLandlord = async () => {
  const response = await api.get('/user/active-landlords', getAuthHeader());
  return response.data;
};

export const getVP = async () => {
  const response = await api.get('/user/propertymanager/vp', getAuthHeader());
  return response.data;
};

export const getRM = async () => {
  const response = await api.get('/user/propertymanager/rm', getAuthHeader());
  return response.data;
};

export const getPM = async () => {
  const response = await api.get('/user/propertymanager/pm', getAuthHeader());
  return response.data;
};

export const delUsers = async (data) => {
  const response = await api.post('/user/delete-user', data, getAuthHeader());
  return response.data;
};

export const updateProperty = async (data) => {
  const response = await api.put('/notification/update-property', data, getAuthHeader());
  return response.data;
};

export const deleteLandlord = async (data) => {
  const response = await api.delete('user/landlord?id=' + data, getAuthHeader());
  return response.data;
};

export const getLandlordTree = async () => {
  const response = await api.get('user/landlordtree', getAuthHeader());
  return response.data;
};

export const getVPTree = async () => {
  const response = await api.get('user/vptree', getAuthHeader());
  return response.data;
};

export const getRMTree = async () => {
  const response = await api.get('user/rmtree', getAuthHeader());
  return response.data;
};

export const getUserBuildingSearch = async (data) => {
  const response = await api.post('user/userbuildingsearch', data, getAuthHeader());
  return response.data;
};

export const setDelegationMoveOut = async (data) => {
  const response = await api.post('user/delegationmoveout', data, getAuthHeader());
  return response.data;
};

export const getUserList = async () => {
  const response = await api.get('user/getuserlist', getAuthHeader());
  return response.data;
};
