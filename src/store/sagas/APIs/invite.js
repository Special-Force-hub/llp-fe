import { api, getAuthHeader } from './help';

export const inviteLandlord = async (data) => {
  const response = await api.post('/invite/landlord-invite', data, getAuthHeader());
  return response.data;
};

export const inviteUser = async (data) => {
  const response = await api.post('/invite/invite-user', data, getAuthHeader());
  return response.data;
};

export const getInviteProperty = async (data) => {
  const response = await api.post('/invite/invite-property', data, getAuthHeader());
  return response.data;
};

export const getInvitePropertyPerUser = async (data) => {
  const response = await api.post('/invite/invite-property-of-user', data, getAuthHeader());
  return response.data;
};
