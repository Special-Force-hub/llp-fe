import types from '../constants/authConstants';

export const emailVerify = (email) => ({
  type: types.EMAIL_VERIFY,
  email,
});

export const updateAuth = (payload) => ({
  type: types.UPDATE_AUTH,
  payload
});

export const send2FACode = (payload) => ({
  type: types.SEND_2FA_CODE,
  payload
});

export const verify2FACode = (payload) => ({
  type: types.VERIFY_2FA_CODE,
  payload
});

export const mfaUpdateResult = (payload) => ({
  type: types.MFA_UPDATE_RESULT,
  payload
});

export const mfaSentAction = (payload) => ({
  type: types.MFA_SENT,
  payload
})


export const userVerifyResponse = (res) => ({
  type: types.USER_VERIFY_RESPONSE,
  payload: res,
});

export const logInStart = (credentials) => ({
  type: types.LOG_IN_START,
  payload: credentials,
});

export const getCaptchaStatus = () => ({
  type: types.GET_CAPTCHA_STATUS,
});

export const setCaptchaRequired = (required) => ({
  type: types.SET_CAPTCHA_REQUIRED,
  payload: required
})

export const refreshUser = () => ({
  type: types.REFRESH_USER,
})

export const setCurrentUser = (user) => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});

export const logInFailure = (error) => ({
  type: types.LOG_IN_FAILURE,
  payload: error,
});

export const registerStart = (credentials) => ({
  type: types.REGISTER_START,
  payload: credentials,
});

export const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});

export const checkInviteToken = (data) => ({
  type: types.CHECK_INVITE_TOKEN,
  payload: data,
});

export const sendDeclineReason = (data) => ({
  type: types.SEND_DECLINE_REASON,
  payload: data,
});

export const saveProfileAction = (data) => ({
  type: types.SAVE_PROFILE,
  payload: data,
});

export const sendResetEmailAction = (data) => ({
  type: types.SEND_RESET_EMAIL,
  payload: data,
});

export const resetPasswordAction = (data) => ({
  type: types.RESET_PASSWORD,
  payload: data,
});

export const setResetResult = (data) => ({
  type: types.RESET_RESULT,
  payload: data,
});

export const findInviteDataAction = (data) => ({
  type: types.FIND_INVITE,
  payload: data,
});

export const setInviteData = (data) => ({
  type: types.SET_INVITE_DATA,
  payload: data,
});

export const setLoading = (data) => ({
  type: types.SET_LOADING,
  payload: data,
});

export const setUserThemeAction = (data) => ({
  type: types.SET_USER_THEME,
  payload: data,
});
