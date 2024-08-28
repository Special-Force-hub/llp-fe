import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getUserCount, getAppCount, getBuildingCount, getLandlordCount, getFlaggedCancelCount } from './APIs/report';
import types from '../constants/reportConstants';
import {
  setUserCountAction,
  setAdminAppReportAction,
  setBuildingAppReportAction,
  setLandlordAppReportAction,
  setLandlordCountAction,
  setBuildingCountAction,
  setFlaggedCancelReportAction,
} from '../actions/reportActions';
import { setAppAction, setBuildingAction } from '../actions/propertyActions';
import { successNotif, failedNotif } from '../actions/notifActions';

function* getUserCountSaga() {
  try {
    const data = yield getUserCount();
    yield put(setUserCountAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetUserCount() {
  yield takeLatest(types.GET_USER_COUNT, getUserCountSaga);
}

function* getAppCountSaga({ payload }) {
  try {
    const res = yield getAppCount(payload);
    if (res.data.reportDataType === 'admin') {
      yield put(setAdminAppReportAction(res));
    } else if (res.data.reportDataType === 'building') {
      yield put(setBuildingAppReportAction(res));
    } else {
      yield put(setLandlordAppReportAction(res));
    }
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetAppCount() {
  yield takeLatest(types.GET_APP_REPORT, getAppCountSaga);
}

function* getFlaggedCancelCountSaga() {
  try {
    const res = yield getFlaggedCancelCount();
    yield put(setFlaggedCancelReportAction(res));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetFlaggedCancelCount() {
  yield takeLatest(types.GET_FLAGGED_CANCEL_REPORT, getFlaggedCancelCountSaga);
}

function* getBuildingCountSaga() {
  try {
    const data = yield getBuildingCount();
    yield put(setBuildingCountAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetBuildingCount() {
  yield takeLatest(types.GET_BUILDING_COUNT, getBuildingCountSaga);
}

function* getLandlordCountSaga() {
  try {
    const data = yield getLandlordCount();
    yield put(setLandlordCountAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetLandlordCount() {
  yield takeLatest(types.GET_LANDLORD_COUNT, getLandlordCountSaga);
}

export default function* reportSaga() {
  yield all([
    call(onGetUserCount),
    call(onGetAppCount),
    call(onGetBuildingCount),
    call(onGetLandlordCount),
    call(onGetFlaggedCancelCount)
  ]);
}
