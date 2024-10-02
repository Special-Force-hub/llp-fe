import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  logIn,
  register,
  verifyEmail,
  send2FA,
  verify2FA,
  checkInviteToken,
  sendDeclineReason,
  saveProfile,
  sendResetEmail,
  resetPassword,
  findInvite,
  setUserTheme,
  getProfile,
  getCaptchaRequirement,
  updatePassword,
} from './APIs/auth';
import {
  setCurrentUser,
  registerSuccess,
  userVerifyResponse,
  setResetResult,
  setLoading,
  setError,
  setInviteData,
  mfaSentAction,
  mfaUpdateResult,
  setCaptchaRequired,
} from '../actions/authActions';
import types from '../constants/authConstants';
import { successNotif, failedNotif } from '../actions/notifActions';
import { inviteUserAction } from 'store/actions/inviteActions';

const setToken = (token) => localStorage.setItem('token', token);
const setUser = (user) => localStorage.setItem('user', user);

function* verifyEmailWithCredential({ email }) {
  try {
    const response = yield verifyEmail(email);
    yield put(userVerifyResponse(response.data));
  } catch (error) {
    yield put(userVerifyResponse(null));
    yield put(failedNotif(error.response.data.message));
  }
}

function* send2FACode({ payload }) {
  try {
    yield put(setLoading(true));

    const response = yield send2FA(payload);
    yield put(mfaSentAction(true));

    yield put(setLoading(false));
  } catch (error) {
    yield put(mfaSentAction('error'));
    yield put(setLoading(false));
  }
}

function* updateAuthentication({ payload }) {
  try {
    yield put(setLoading(true));

    const response = yield updatePassword(payload);
    yield refreshUser();

    yield put(setLoading(false));
  } catch (error) {
    yield put(setError(error.response.data.message));
    yield put(setLoading(false));
  }
}

function* verify2FACode({ payload }) {
  try {
    const response = yield verify2FA(payload);
    yield put(mfaUpdateResult('success'));
  } catch (error) {
    yield put(mfaUpdateResult('failed'));
  }
}

function* logInWithCredentials({ payload: { email, password, captcha_token } }) {
  try {
    yield put(setLoading(true));
    yield put(setError(''));

    const response = yield logIn(email, password, captcha_token);
    const user = response.data;
    setToken(user.accessToken);
    const userData = {
      name: response.data.username,
      email: response.data.email,
      role: response.data.role,
      image: response.data.image,
      jobTitle: response.data.job_title,
      isVerified: response.data.is_verified,
      mfaMethod: response.data.mfa_method,
      phone: response.data.phone,
      id: response.data.id,
      theme: response.data.theme,
      require2FA: response.data.require_2fa,
      requirePasswordUpdate: response.data.require_password_update,
    };

    if (response.require2FA) {
      yield put(mfaSentAction(true));
    }

    setUser(JSON.stringify(userData));
    yield put(setCurrentUser(userData));

    yield put(setLoading(false));

    if (!response.require2FA && !response.requirePasswordUpdate) {
      yield put(setError(response.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));

    if (error.response.data.requireCaptcha) {
      yield put(setCaptchaRequired(true));
    }
    yield put(setLoading(false));
  }
}

function* getCaptchaStatus() {
  try {
    const response = yield getCaptchaRequirement();
    yield put(setCaptchaRequired(response.required));
  } catch (error) {}
}

function* refreshUser() {
  try {
    const response = yield getProfile();

    const userData = {
      name: response.data.username,
      email: response.data.email,
      role: response.data.role,
      image: response.data.image,
      jobTitle: response.data.job_title,
      isVerified: response.data.is_verified,
      mfaMethod: response.data.mfa_method,
      phone: response.data.phone,
      id: response.data.id,
      theme: response.data.theme,
    };

    setUser(JSON.stringify(userData));
    yield put(setCurrentUser(userData));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* registerWithCredentials({
  payload: { email, password, username, role, landlordId, phonenumber, jobtitle },
}) {
  try {
    const response = yield register(
      username,
      email,
      password,
      role,
      landlordId,
      phonenumber,
      jobtitle,
    );
    yield put(successNotif(response.data.message));
    yield put(registerSuccess({ email, password }));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* checkInviteTokenSaga({ payload }) {
  try {
    const response = yield checkInviteToken(payload);
    yield put(userVerifyResponse(response.data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* sendDeclineReasonSaga({ payload }) {
  try {
    const response = yield sendDeclineReason(payload);
    yield put(successNotif(response.message));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* saveProfileSaga({ payload }) {
  try {
    const response = yield saveProfile(payload);
    yield put(successNotif(response.message));
    const userData = {
      name: response.data.username,
      email: response.data.email,
      role: response.data.role,
      image: response.data.image,
      jobTitle: response.data.job_title,
      phone: response.data.phone,
      id: response.data.id,
      theme: response.data.theme,
      mfaMethod: response.data.mfa_method,
      isVerified: response.data.is_verified,
    };
    setUser(JSON.stringify(userData));
    yield put(setCurrentUser(userData));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* sendResetEmailSaga({ payload }) {
  try {
    yield put(setLoading(true));
    yield put(setError(''));

    const response = yield sendResetEmail(payload);
    yield put(setResetResult('success'));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setError(error.response.data.message));
    yield put(setLoading(false));
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    yield put(setLoading(true));
    yield put(setResetResult('loading'));
    const response = yield resetPassword(payload);
    yield put(setResetResult('success'));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setError(error.response.data.message));
    yield put(setLoading(false));
  }
}

function* logInAfterRegister({ payload: { email, password } }) {
  yield logInWithCredentials({ payload: { email, password } });
}

function* onLogInStart() {
  yield takeLatest(types.LOG_IN_START, logInWithCredentials);
}

function* onGetCaptchaStatus() {
  yield takeLatest(types.GET_CAPTCHA_STATUS, getCaptchaStatus);
}

function* onRefreshUser() {
  yield takeLatest(types.REFRESH_USER, refreshUser);
}

function* onRegisterStart() {
  yield takeLatest(types.REGISTER_START, registerWithCredentials);
}

function* onRegisterSuccess() {
  yield takeLatest(types.REGISTER_SUCCESS, logInAfterRegister);
}

function* onVerifyEmail() {
  yield takeLatest(types.EMAIL_VERIFY, verifyEmailWithCredential);
}

function* onSend2FACode() {
  yield takeLatest(types.SEND_2FA_CODE, send2FACode);
}

function* onUpdateAuth() {
  yield takeLatest(types.UPDATE_AUTH, updateAuthentication);
}

function* onVerify2FACode() {
  yield takeLatest(types.VERIFY_2FA_CODE, verify2FACode);
}

function* onCheckInviteToken() {
  yield takeLatest(types.CHECK_INVITE_TOKEN, checkInviteTokenSaga);
}

function* onSendDeclineReason() {
  yield takeLatest(types.SEND_DECLINE_REASON, sendDeclineReasonSaga);
}

function* onSaveProfile() {
  yield takeLatest(types.SAVE_PROFILE, saveProfileSaga);
}

function* onSendResetEmail() {
  yield takeLatest(types.SEND_RESET_EMAIL, sendResetEmailSaga);
}

function* onResetPassword() {
  yield takeLatest(types.RESET_PASSWORD, resetPasswordSaga);
}

function* findInviteSaga({ payload }) {
  try {
    yield put(setLoading(true));
    yield put(setError(''));

    const response = yield findInvite(payload);

    if (response.message.status === 'invalid') {
      throw {
        response: {
          data: {
            message: 'Unable to find invitation',
          },
        },
      };
    }
    yield put(
      inviteUserAction({
        type: 'resend-email',
        emailSubject: response.message.email_title || "You've been Invited to the Leap Portal",
        emailContent: response.message.email_text,
      }),
    );

    yield put(setLoading(false));
    yield put(setInviteData(response.message));
  } catch (error) {
    yield put(setError(error.response.data.message));
    yield put(setLoading(false));
  }
}

function* onFindInvite() {
  yield takeLatest(types.FIND_INVITE, findInviteSaga);
}

function* setUserThemeSaga({ payload }) {
  try {
    const response = yield setUserTheme({ payload });
    console.log(response);
    const userData = {
      name: response.data.username,
      email: response.data.email,
      role: response.data.role,
      image: response.data.image,
      jobTitle: response.data.job_title,
      phone: response.data.phone,
      id: response.data.id,
      theme: response.data.theme,
    };
    setUser(JSON.stringify(userData));
    yield put(setCurrentUser(userData));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onSetUserTheme() {
  yield takeLatest(types.SET_USER_THEME, setUserThemeSaga);
}

export default function* authSagas() {
  yield all([
    call(onLogInStart),
    call(onGetCaptchaStatus),
    call(onRefreshUser),
    call(onRegisterStart),
    call(onRegisterSuccess),
    call(onVerifyEmail),
    call(onUpdateAuth),
    call(onSend2FACode),
    call(onVerify2FACode),
    call(onCheckInviteToken),
    call(onSendDeclineReason),
    call(onSaveProfile),
    call(onSendResetEmail),
    call(onResetPassword),
    call(onFindInvite),
    call(onSetUserTheme),
  ]);
}
