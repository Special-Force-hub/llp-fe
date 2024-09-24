import { api, getAuthHeader } from './help';

export const verifyEmail = async (email) => {
  const response = await api.post('/auth/emailverify', { email });
  return response.data;
};

export const updatePassword = async (payload) => {
  const response = await api.post('/auth/update-password', payload, getAuthHeader());
  return response.data;
};

export const send2FA = async (payload) => {
  const response = await api.post('/auth/send-auth-code', payload, getAuthHeader());
  return response.data;
};

export const verify2FA = async (payload) => {
  const response = await api.post('/auth/verify-code', payload, getAuthHeader());
  return response.data;
};

export const logIn = async (email, password, captcha_token) => {
  const response = await api.post('/auth/signin', { email, password, captcha_token });
  return response.data;
};

export const getCaptchaRequirement = async () => {
  const response = await api.get('/auth/captcha-status');

  return response.data;
};

export const register = async (
  username,
  email,
  password,
  role,
  landlordId,
  phonenumber,
  jobtitle,
) => {
  const response = await api.post('auth/signup', {
    username,
    email,
    password,
    role,
    landlordId,
    phonenumber,
    jobtitle,
  });
  return response;
};

export const checkInviteToken = async (data) => {
  const response = await api.get('/auth/check-token?token=' + data);
  return response.data;
};

export const sendDeclineReason = async (data) => {
  const response = await api.post('/auth/decline-invite', data, getAuthHeader());
  return response.data;
};

export const saveProfile = async (data) => {
  const response = await api.post('/auth/edit-profile', data, getAuthHeader());
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile', getAuthHeader());
  return response.data;
};

export const sendResetEmail = async (data) => {
  const response = await api.post('/auth/send-resetemail', data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data, getAuthHeader());
  return response.data;
};

export const findInvite = async (data) => {
  const response = await api.post('/auth/find-invite', data);
  return response.data;
};

export const setUserTheme = async (data) => {
  const response = await api.post('auth/user-theme', data, getAuthHeader());
  return response.data;
};
