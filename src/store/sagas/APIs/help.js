import axios from 'axios';

// const baseURL = 'https://landlordportal-dev.leapeasyapi.com/api';
// const baseURL = 'https://landlordportal.leapeasyapi.com/api';
const baseURL = process.env.REACT_APP_API;
export const api = axios.create({
  baseURL,
});

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `${token}`,
    },
  };
};

export const getDocAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    responseType: 'blob',
    headers: {
      Authorization: `${token}`,
      // 'Content-Type': 'application/json',
      // Accept: 'application/pdf'
    },
  };
};
