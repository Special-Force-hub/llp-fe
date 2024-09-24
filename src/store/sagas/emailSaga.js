import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getEmail, deleteEmail } from './APIs/email';
import types from '../constants/emailConstants';
import { setEmailAction } from '../actions/emailActions';
import { successNotif, failedNotif } from '../actions/notifActions';

function* getEmailSaga() {
  try {
    const data = yield getEmail();
    yield put(setEmailAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* deleteEmailSaga({ payload }) {
  try {
    const data = yield deleteEmail(payload);
    yield put(setEmailAction(data));
    yield put(successNotif('Delete Success'));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetEmail() {
  yield takeLatest(types.GET_EMAIL, getEmailSaga);
}

function* onDeleteEmail() {
  yield takeLatest(types.DEL_EMAIL, deleteEmailSaga);
}

export default function* emailSaga() {
  yield all([call(onGetEmail), call(onDeleteEmail)]);
}
