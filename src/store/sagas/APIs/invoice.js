import { api, getAuthHeader, getDocAuthHeader } from './help';

export const getQBOAuth = async () => {
  const response = await api.get('/invoice/Oauth', getAuthHeader());
  return response.data;
};

export const getInvoiceList = async (payload) => {
  const response = await api.post('/invoice/list', payload, getAuthHeader());
  return response.data;
};

export const getInvoicePDF = async (data) => {
  const response = await api.get('/invoice/pdf?id=' + data, getDocAuthHeader());
  return response.data;
};

export const sendDispute = async (data) => {
  const response = await api.post('/invoice/dispute', data, getAuthHeader());
  return response.data;
};

export const fetchInvoicePolicy = async (data) => {
  const response = await api.get('/invoice/policy?riderId=' + data, getAuthHeader());
  return response.data;
};

export const searchInvoiceNumber = async (data) => {
  const response = await api.get('/invoice/search?invoiceNum=' + data, getAuthHeader());
  return response.data;
};
