import { all, call } from 'redux-saga/effects';

import authSagas from './authSaga';
import propertySagas from './propertySaga';
import userSagas from './userSaga';
import delegationSaga from './delegationSaga';
import emailSaga from './emailSaga';
import notificationSaga from './notificationSaga';
import inviteSaga from './inviteSaga';
import reportSaga from './reportSaga';
import claimSaga from './claimSaga';
import docSaga from './docSaga';
import invoiceSaga from './invoiceSaga';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(propertySagas),
    call(userSagas),
    call(delegationSaga),
    call(emailSaga),
    call(notificationSaga),
    call(inviteSaga),
    call(reportSaga),
    call(claimSaga),
    call(docSaga),
    call(invoiceSaga),
  ]);
}
