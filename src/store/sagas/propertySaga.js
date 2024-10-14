import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getBuilding,
  getApp,
  getClaim,
  getPolicy,
  getFilteredApp,
  getSearchDBResult,
  getBuildingDelegation,
  getBuildingInvoice,
  cancelPolicies,
  getPolicyCancelLogs,
} from './APIs/property';
import types from '../constants/propertyConstant';
import {
  setBuildingAction,
  setAppAction,
  setClaimAction,
  setPolicyAction,
  getPolicyCancelAction,
  getPolicyAction,
  setPolicyCancelAction,
  setBuildingDelegationAction,
  setBuildingInvoiceAction,
  setPolicyCancelLogsAction,
  errMsg,
} from '../actions/propertyActions';
import { successNotif, failedNotif } from '../actions/notifActions';

function* getBuildingSaga({ payload }) {
  try {
    const response = yield getBuilding(payload);
    yield put(setBuildingAction(response));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getAppSaga({ payload }) {
  try {
    const data = yield getApp(payload);
    yield put(setAppAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getClaimSaga({ payload }) {
  try {
    const data = yield getClaim(payload);
    yield put(setClaimAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getPolicySaga({ payload }) {
  try {
    const data = yield getPolicy(payload);
    yield put(setPolicyAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getPolicyCancelSaga({ payload }) {
  try {
    const data = yield getPolicy({ ...(payload || {}), cancel: true });
    yield put(setPolicyCancelAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* cancelPoliciesSaga({ payload }) {
  try {
    yield put(successNotif('loading'));
    const res = yield cancelPolicies(payload);
    yield put(successNotif(res));
  } catch (error) {
    console.log(error);
    yield put(failedNotif(error.response.data.message));
  }
}

function* getSearchDBSaga({ payload }) {
  const { label } = payload;
  try {
    const searchResult = yield getSearchDBResult(payload);
    if (label === 'application') {
      yield put(setAppAction(searchResult));
    } else if (label === 'building') {
      yield put(setBuildingAction(searchResult));
    } else if (label === 'claim') {
      yield put(setClaimAction(searchResult));
    } else if (label === 'policy') {
      yield put(setPolicyAction(searchResult));
    } else if (label === 'policy-cancel') {
      yield put(setPolicyCancelAction(searchResult));
    }
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* onGetBuilding() {
  yield takeLatest(types.GET_BUILDING, getBuildingSaga);
}

function* onGetApp() {
  yield takeLatest(types.GET_APP, getAppSaga);
}

function* onGetClaim() {
  yield takeLatest(types.GET_CLAIM, getClaimSaga);
}

function* onGetPolicy() {
  yield takeLatest(types.GET_POLICY, getPolicySaga);
}

function* onGetPolicyCancel() {
  yield takeLatest(types.GET_POLICY_CANCEL, getPolicyCancelSaga);
}

function* onCancelPolicies() {
  yield takeLatest(types.CANCEL_POLICIES, cancelPoliciesSaga);
}

function* getFilteredAppSaga({ payload }) {
  try {
    const { title } = payload;
    const res = yield getFilteredApp(payload);
    if (title === 'application') {
      yield put(setAppAction(res));
    } else if (title === 'building') {
      yield put(setBuildingAction(res));
    } else if (title === 'policy') {
      yield put(setPolicyAction(res));
    } else if (title === 'policy-cancel') {
      yield put(setPolicyCancelAction(res));
    } else if (title === 'claim') {
      yield put(setClaimAction(res));
    }
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* onFilterApp() {
  yield takeLatest(types.FILTER_DATA, getFilteredAppSaga);
}

function* onSearchDB() {
  yield takeLatest(types.SEARCH_DB, getSearchDBSaga);
}

function* getBuildingDelegationSaga({ payload }) {
  try {
    const res = yield getBuildingDelegation(payload);
    yield put(setBuildingDelegationAction(res));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* onGetBuildingDelegation() {
  yield takeLatest(types.GET_BUILDING_DELEGATION, getBuildingDelegationSaga);
}

function* getBuildingInvoiceSaga({ payload }) {
  try {
    const res = yield getBuildingInvoice(payload);
    yield put(setBuildingInvoiceAction(res));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* onGetBuildingInvoice() {
  yield takeLatest(types.GET_BUILDING_INVOICE, getBuildingInvoiceSaga);
}

function* getPolicyCancelLogsSaga() {
  try {
    const data = yield getPolicyCancelLogs();
    yield put(setPolicyCancelLogsAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onGetPolicyCancelLogs() {
  yield takeLatest(types.GET_POLICY_CANCEL_LOGS, getPolicyCancelLogsSaga);
}

export default function* propertySagas() {
  yield all([
    call(onGetBuilding),
    call(onGetApp),
    call(onGetClaim),
    call(onGetPolicy),
    call(onGetPolicyCancel),
    call(onCancelPolicies),
    call(onFilterApp),
    call(onSearchDB),
    call(onGetBuildingDelegation),
    call(onGetBuildingInvoice),
    call(onGetPolicyCancelLogs),
  ]);
}
