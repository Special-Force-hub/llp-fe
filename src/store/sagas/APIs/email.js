import { api, getAuthHeader } from './help';

export const getEmail = async () => {
  const response = await api.get('/email', getAuthHeader());
  return response.data;
};

export const deleteEmail = async (data) => {
  const response = await api.delete('/email?id=' + data, getAuthHeader());
  return response.data;
};
