import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getLandlord,
  getRider,
  getProperty,
  createClaim,
  checkPolicyDuplicated,
} from './APIs/claim';

import types from '../constants/claimformConstants';

import {
  setAgreementIdAction,
  setLandlordArrayAction,
  setErrorAction,
  setLedgerIdAction,
  setClaimIdAction,
  setApartmentArrayAction,
  setRiderArrayAction,
  setPolicyDuplicatedAction,
  setResultAction,
} from '../actions/claimFormActions';

function* getLandlordSaga({ payload }) {
  try {
    const property = yield getLandlord(payload);
    yield put(setLandlordArrayAction(property));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetLandlord() {
  yield takeLatest(types.GET_LANDLORD, getLandlordSaga);
}

function* getApartmentSaga({ payload }) {
  try {
    const property = yield getProperty(payload);
    yield put(setApartmentArrayAction(property));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetApartment() {
  yield takeLatest(types.GET_APARTMENT, getApartmentSaga);
}

function* createClaimSaga({ payload }) {
  const { leaseFile, ledgerFile, otherFiles, ...claimData } = payload;
  try {
    const formData = new FormData();
    formData.append('claimData', JSON.stringify(claimData));
    formData.append(
      'files',
      ledgerFile,
      `Lease Agreement Document.${ledgerFile.path.split('.')[1]}`,
    );
    formData.append('files', leaseFile, `Resident Ledger Document.${leaseFile.path.split('.')[1]}`);
    for (const otherFile of otherFiles) {
      formData.append('files', otherFile, otherFile.path);
    }
    yield put(setResultAction({ status: 'pending' }));
    const res = yield createClaim(formData);
    yield put(setClaimIdAction(res.name));
    yield put(setResultAction({ status: 'success' }));
  } catch (error) {
    console.log(error);
    yield put(setResultAction({ status: 'failed', data: error.response.data }));
  }
}

function* onCreateClaim() {
  yield takeLatest(types.CREAT_CLAIM, createClaimSaga);
}

function* getRiderSaga({ payload }) {
  try {
    const property = yield getRider(payload);
    yield put(setRiderArrayAction(property));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetRider() {
  yield takeLatest(types.GET_RIDER, getRiderSaga);
}

function* checkDuplicatedSaga({ payload }) {
  try {
    yield put(setPolicyDuplicatedAction(null));
    const result = yield checkPolicyDuplicated(payload);
    yield put(setPolicyDuplicatedAction(result));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onCheckDuplicated() {
  yield takeLatest(types.CHECK_POLICY_DUPLICATED, checkDuplicatedSaga);
}

export default function* inviteSaga() {
  yield all([
    call(onGetLandlord),
    call(onGetApartment),
    call(onGetRider),
    call(onCreateClaim),
    call(onCheckDuplicated),
  ]);
}
