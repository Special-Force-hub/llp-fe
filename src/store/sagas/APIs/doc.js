import { api, getAuthHeader, getDocAuthHeader } from './help';

export const getTitle = async (data) => {
  const response = await api.get('/document/title?appId=' + data, getAuthHeader());
  return response.data;
};

export const getFile = async (data) => {
  const response = await api.get('/document/file?docId=' + data, getDocAuthHeader());
  return response.data;
};
