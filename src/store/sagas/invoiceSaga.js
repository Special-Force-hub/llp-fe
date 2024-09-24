import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getQBOAuth,
  getInvoiceList,
  getInvoicePDF,
  sendDispute,
  fetchInvoicePolicy,
  searchInvoiceNumber,
} from './APIs/invoice';

import types from '../constants/invoiceConstants';

import {
  setRedirectURLAction,
  setErrorAction,
  setInvoiceListAction,
  setPDFLoadingAction,
  setPolicyAction,
  searchSpinnerAction,
} from '../actions/invoiceActions';
import { successNotif, failedNotif } from '../actions/notifActions';
import { getInvoiceListAction } from '../actions/invoiceActions';

function* getQBOAuthSaga() {
  try {
    const res = yield getQBOAuth();
    yield put(setRedirectURLAction(res));
  } catch (error) {
    console.log(error);
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetQBOAuth() {
  yield takeLatest(types.GET_QBOAUTH, getQBOAuthSaga);
}

function* getInvoiceListSaga(data) {
  try {
    const res = yield getInvoiceList(data);
    yield put(setInvoiceListAction(res));
  } catch (error) {
    console.log(error);
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetInvoiceList() {
  yield takeLatest(types.GET_INVOICE_LIST, getInvoiceListSaga);
}

function* getInvoicePDFSaga({ payload }) {
  try {
    yield put(setPDFLoadingAction(true));
    const res = yield getInvoicePDF(payload);
    yield put(setInvoiceListAction(res));
    yield put(setPDFLoadingAction(false));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetInvoicePDF() {
  yield takeLatest(types.GET_INVOICE_PDF, getInvoicePDFSaga);
}

function* sendDisputeSaga({ payload }) {
  try {
    yield put(successNotif('loading'));
    const res = yield sendDispute(payload);

    yield put(getInvoiceListAction());
    yield put(successNotif(res));
  } catch (error) {
    console.log(error);
    yield put(failedNotif(error.response.data.message));
  }
}

function* onSendDisputeToAdmin() {
  yield takeLatest(types.SEND_DISPUTE, sendDisputeSaga);
}

function* fetchInvoicePolicySaga({ payload }) {
  try {
    const res = yield fetchInvoicePolicy(payload);
    yield put(setPolicyAction(res));
  } catch (error) {
    console.log(error);
    yield put(failedNotif(error.response.data.message));
  }
}

function* onFetchInvoicePolicy() {
  yield takeLatest(types.FETCH_INVOICE_POLICY, fetchInvoicePolicySaga);
}

function* searchInvoiceNumberSaga({ payload }) {
  try {
    console.log(payload, 'mmmmmmmm');
    yield put(searchSpinnerAction(true));
    const res = yield searchInvoiceNumber(payload);
    yield put(searchSpinnerAction(false));
    yield put(setInvoiceListAction(res));
  } catch (error) {
    console.log(error);
    yield put(failedNotif(error.response.data.message));
  }
}

function* onSearchInvoiceNumber() {
  yield takeLatest(types.SEARCH_INVOICE_NUMBER, searchInvoiceNumberSaga);
}

export default function* docSaga() {
  yield all([
    call(onGetQBOAuth),
    call(onGetInvoiceList),
    call(onGetInvoicePDF),
    call(onSendDisputeToAdmin),
    call(onFetchInvoicePolicy),
    call(onSearchInvoiceNumber),
  ]);
}
