import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  inviteLandlord,
  inviteUser,
  getInviteProperty,
  getInvitePropertyPerUser,
} from './APIs/invite';
import types from '../constants/inviteConstants';
import { successNotif, failedNotif, getNotifToAction } from '../actions/notifActions';
import { getEmailAction } from '../actions/emailActions';
import { getInvitePropertyAction, setInvitePropertyAction } from '../actions/inviteActions';

function* inviteLandlordSaga({ payload }) {
  try {
    const response = yield inviteLandlord(payload);
    yield put(successNotif(response));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onInviteLandlord() {
  yield takeLatest(types.INVITE_LANDLORD, inviteLandlordSaga);
}

function* inviteUserSaga({ payload }) {
  try {
    const res = yield inviteUser(payload);
    yield put(successNotif(res));
    if (payload.type === 'resend-email') {
      yield put(getEmailAction());
    } else if (payload.type === 'resend-request') {
      yield put(getNotifToAction());
    } else {
      yield put(
        getInvitePropertyAction({ inviteRole: payload.userRole, landlordId: payload.landlordId }),
      );
    }
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onInviteUser() {
  yield takeLatest(types.INVITE_USER, inviteUserSaga);
}

function* getInvitePropertySaga({ payload }) {
  try {
    const property = yield getInviteProperty(payload);
    yield put(setInvitePropertyAction(property));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetInviteProperty() {
  yield takeLatest(types.GET_INVITE_PROPERTY, getInvitePropertySaga);
}

function* getInvitePropertyPerUserSaga({ payload }) {
  try {
    const result = yield getInvitePropertyPerUser(payload);
    yield put(setInvitePropertyAction(result));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetInvitePropertyPerUser() {
  yield takeLatest(types.GET_INVITE_PROPERTY_PER_USER, getInvitePropertyPerUserSaga);
}

export default function* inviteSaga() {
  yield all([
    call(onInviteLandlord),
    call(onInviteUser),
    call(onGetInviteProperty),
    call(onGetInvitePropertyPerUser),
  ]);
}
