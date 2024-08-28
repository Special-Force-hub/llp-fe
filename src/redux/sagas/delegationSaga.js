import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getRequestLandlord,
  getRequestVP,
  sendPropertyRequest,
  getRequestBuilding,
  getRequestUserProperty,
} from './APIs/delegation';
import { successNotif, failedNotif } from '../actions/notifActions';
import {
  setRequestLandlordAction,
  setRequestVPAction,
  setRequestBuildingAction,
  setRequestUserPropertyAction,
} from '../actions/delegationActions';
import types from '../constants/delegationConstants';

function* getRequestLandlordSaga() {
  try {
    const data = yield getRequestLandlord();
    yield put(setRequestLandlordAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* sendPropertyRequestSaga({ payload }) {
  try {
    const response = yield sendPropertyRequest(payload);
    yield put(successNotif(response.message));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* getRequestVPSaga() {
  try {
    const response = yield getRequestVP();
    yield put(setRequestVPAction(response));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* getRequestBuildingSaga() {
  try {
    const data = yield getRequestBuilding();
    yield put(setRequestBuildingAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* getRequestUserPropertySaga({ payload }) {
  try {
    const data = yield getRequestUserProperty(payload);
    yield put(setRequestUserPropertyAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.data.message));
  }
}

function* onGetRequestLandlord() {
  yield takeLatest(types.GET_REQUEST_LANDLORD, getRequestLandlordSaga);
}

function* onSendPropertyRequest() {
  yield takeLatest(types.SEND_PROPERTY_REQUEST, sendPropertyRequestSaga);
}

function* onGetRequestVP() {
  yield takeLatest(types.GET_REQUEST_VP, getRequestVPSaga);
}

function* onGetRequestBuilding() {
  yield takeLatest(types.GET_REQUEST_BUILDING, getRequestBuildingSaga);
}

function* onGetRequestUserProperty() {
  yield takeLatest(types.GET_RQUEST_USER_PROPERTY, getRequestUserPropertySaga);
}

export default function* delegationSaga() {
  yield all([
    call(onGetRequestLandlord),
    call(onSendPropertyRequest),
    call(onGetRequestVP),
    call(onGetRequestBuilding),
    call(onGetRequestUserProperty),
  ]);
}
