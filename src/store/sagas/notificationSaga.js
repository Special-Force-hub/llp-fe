import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  acceptRequest,
  declineRequest,
  getToMsg,
  getFromMsg,
  deleteRequest,
  setNotificationActivity,
  getNotification,
} from './APIs/notification.js';
import types from '../constants/notifConstants.js';
import {
  setNotifFromAction,
  setNotifToAction,
  successNotif,
  failedNotif,
  setActivityTimeAction,
  setNotificationAction,
  getNotifFromAction,
} from '../actions/notifActions.js';

function* getNotifToSaga() {
  try {
    const data = yield getToMsg();
    yield put(setNotifToAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* getNotifFromSaga() {
  try {
    const data = yield getFromMsg();
    yield put(setNotifFromAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* acceptRequestSaga({ payload }) {
  try {
    const data = yield acceptRequest(payload);
    yield put(setNotifFromAction(data));
    yield put(getNotifFromAction());
    yield put(successNotif('Accept Success!'));
  } catch (error) {
    failedNotif(error.response.data.message);
  }
}

function* declineRequestSaga({ payload }) {
  try {
    const data = yield declineRequest(payload);
    yield put(setNotifFromAction(data));
    yield put(getNotifFromAction());
    yield put(successNotif('Decline Successful!'));
  } catch (error) {
    failedNotif(error.response.data.message);
  }
}

function* deleteRequestSaga({ payload }) {
  try {
    const data = yield deleteRequest(payload);
    yield put(setNotifToAction(data));
    yield put(successNotif('Delete Successful!'));
  } catch (error) {
    failedNotif(error.response.data.message);
  }
}

function* onGetNotifToMsg() {
  yield takeLatest(types.GET_NOTIF_TO, getNotifToSaga);
}

function* onGetNotifFromMsg() {
  yield takeLatest(types.GET_NOTIF_FROM, getNotifFromSaga);
}

function* onAcceptRequest() {
  yield takeLatest(types.ACCEPT_REQUEST, acceptRequestSaga);
}

function* onDeclineRequest() {
  yield takeLatest(types.DECLINE_REQUEST, declineRequestSaga);
}

function* onDeleteRequest() {
  yield takeLatest(types.DELETE_REQUEST, deleteRequestSaga);
}

function* setNotificationActivitySaga() {
  try {
    const response = yield setNotificationActivity();
    yield put(setActivityTimeAction(response));
  } catch (error) {
    yield put(failedNotif(error));
  }
}

function* onSetNotificationActivity() {
  yield takeLatest(types.SET_NOTIF_ACTIVITY, setNotificationActivitySaga);
}

function* getNotificationSaga() {
  try {
    const response = yield getNotification();
    yield put(setNotificationAction(response));
  } catch (error) {
    yield put(failedNotif(error));
  }
}

function* onGetNotification() {
  yield takeLatest(types.GET_NOTIFICATION, getNotificationSaga);
}

export default function* notificationSaga() {
  yield all([
    call(onGetNotifToMsg),
    call(onGetNotifFromMsg),
    call(onAcceptRequest),
    call(onDeclineRequest),
    call(onDeleteRequest),
    call(onSetNotificationActivity),
    call(onGetNotification),
  ]);
}
