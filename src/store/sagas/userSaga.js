import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getInviteLandlord,
  getVP,
  getRM,
  getPM,
  getUserApp,
  getUserPolicy,
  getBuilding,
  getUserClaim,
  delUsers,
  getActiveLandlord,
  updateProperty,
  deleteLandlord,
  getLandlordTree,
  getVPTree,
  getRMTree,
  getUserBuildingSearch,
  setDelegationMoveOut,
  getUserList,
} from './APIs/user';
import types from '../constants/userConstant';
import {
  setActiveLandlordAction,
  getVPAction,
  getRMAction,
  getPMAction,
  setInviteLandlordAction,
  setVPAction,
  setPMAction,
  setRMAction,
  errMsg,
  setLandlordTreeAction,
  setVPTreeAction,
  setUserBuildingSearchAction,
  getLandlordTreeAction,
  getVPTreeAction,
  setRMTreeAction,
  getRMTreeAction,
  setTreeLoadingAction,
  getUserBuildingSearchAction,
  setUserListAction,
} from '../actions/userActions';
import {
  setAppAction,
  setClaimAction,
  setBuildingAction,
  setPolicyAction,
} from '../actions/propertyActions';
import { successNotif, failedNotif } from '../actions/notifActions';

function* getInviteLandlordSaga({ payload }) {
  console.log(payload);
  try {
    const data = yield getInviteLandlord(payload);
    yield put(setInviteLandlordAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getVPSaga() {
  try {
    const data = yield getVP();
    yield put(setVPAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getRMSaga() {
  try {
    const data = yield getRM();
    yield put(setRMAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getPMSaga() {
  try {
    const data = yield getPM();
    yield put(setPMAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* onGetInviteLandlord() {
  yield takeLatest(types.GET_INVITE_LL, getInviteLandlordSaga);
}

function* onGetVP() {
  yield takeLatest(types.GET_VP, getVPSaga);
}

function* onGetRM() {
  yield takeLatest(types.GET_RM, getRMSaga);
}

function* onGetPM() {
  yield takeLatest(types.GET_PM, getPMSaga);
}

function* getUserBuildingSaga({ payload }) {
  try {
    const data = yield getBuilding(payload);
    yield put(setBuildingAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getUserAppSaga({ payload }) {
  try {
    const data = yield getUserApp(payload);
    yield put(setAppAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getUserPolicySaga({ payload }) {
  try {
    const data = yield getUserPolicy(payload);
    yield put(setPolicyAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* getUserClaimSaga({ payload }) {
  try {
    const data = yield getUserClaim(payload);
    yield put(setClaimAction(data));
  } catch (error) {
    yield put(errMsg(error.response));
  }
}

function* delUsersSaga({ payload: { data, role, search } }) {
  try {
    const res = yield delUsers(data);
    yield put(successNotif(res.message));
    if (search) {
      yield put(getUserBuildingSearchAction(search));
    } else if (role === 'vp') {
      yield put(getVPAction());
    } else if (role === 'rm') {
      yield put(getRMAction());
    } else if (role === 'pm') {
      yield put(getPMAction());
    }
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* updateUserPropertySaga({ payload }) {
  try {
    const res = yield updateProperty(payload);
    yield put(successNotif(res));
    if (payload.delegation.accepter_role === 'vp') {
      yield put(getVPAction());
    } else if (payload.delegation.accepter_role === 'rm') {
      yield put(getRMAction());
    } else if (payload.delegation.accepter_role === 'pm') {
      yield put(getPMAction());
    }
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* getActiveLandlordSaga({payload}) {
  try {
    const data = yield getActiveLandlord(payload);
    yield put(setActiveLandlordAction(data));
  } catch (error) {
    failedNotif(error.response.message);
  }
}

function* onGetUserBuilding() {
  yield takeLatest(types.GET_USER_BUILDING, getUserBuildingSaga);
}

function* onGetUserApp() {
  yield takeLatest(types.GET_USER_APP, getUserAppSaga);
}

function* onGetUserPolicy() {
  yield takeLatest(types.GET_USER_POLICY, getUserPolicySaga);
}

function* onGetUserClaim() {
  yield takeLatest(types.GET_USER_CLAIM, getUserClaimSaga);
}

function* onDelUsers() {
  yield takeLatest(types.DEL_USERS, delUsersSaga);
}

function* onUpdateUserProperty() {
  yield takeLatest(types.UPDATE_USER_PROPERTY, updateUserPropertySaga);
}

function* onGetActiveLandlord() {
  yield takeLatest(types.GET_ACTIVE_LL, getActiveLandlordSaga);
}

function* deleteLandlordSaga({ payload }) {
  try {
    const data = yield deleteLandlord(payload);
    yield put(setActiveLandlordAction(data));
    yield put(successNotif(data.message));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onDeleteLandlord() {
  yield takeLatest(types.DEL_LANDLORD, deleteLandlordSaga);
}

function* getLandlordTreeSaga() {
  try {
    const data = yield getLandlordTree();
    yield put(setLandlordTreeAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onGetLandlordTree() {
  yield takeLatest(types.GET_LANDLORDTREE, getLandlordTreeSaga);
}

function* getVPTreeSaga() {
  try {
    const data = yield getVPTree();
    yield put(setVPTreeAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onGetVPTree() {
  yield takeLatest(types.GET_VPTREE, getVPTreeSaga);
}

function* getRMTreeSaga() {
  try {
    const data = yield getRMTree();
    yield put(setRMTreeAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onGetRMTree() {
  yield takeLatest(types.GET_RMTREE, getRMTreeSaga);
}

function* getUserBuildingSearchSaga({ payload }) {
  try {
    const data = yield getUserBuildingSearch(payload);
    yield put(setUserBuildingSearchAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onGetUserBuildingSearch() {
  yield takeLatest(types.GET_USER_BUILDING_SEARCH, getUserBuildingSearchSaga);
}

function* setDelegationMoveOutSaga({ payload }) {
  try {
    yield put(setTreeLoadingAction(true));
    const data = yield setDelegationMoveOut(payload);
    yield put(successNotif(data));
    if (payload.editType === 'landlord') {
      yield put(getLandlordTreeAction());
    } else if (payload.editType === 'vp') {
      yield put(getVPTreeAction());
    } else if (payload.editType === 'rm') {
      yield put(getRMTreeAction());
    }
    yield put(setTreeLoadingAction(false));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onSetDelegationMoveOut() {
  yield takeLatest(types.DELEGATION_MOVEOUT, setDelegationMoveOutSaga);
}

function* getUserListSaga() {
  try {
    const data = yield getUserList();
    yield put(setUserListAction(data));
  } catch (error) {
    yield put(failedNotif(error.response.message));
  }
}

function* onGetUserList() {
  yield takeLatest(types.GET_USER_LIST, getUserListSaga);
}

export default function* userSagas() {
  yield all([
    call(onGetInviteLandlord),
    call(onGetVP),
    call(onGetRM),
    call(onGetPM),
    call(onGetUserBuilding),
    call(onGetUserApp),
    call(onGetUserPolicy),
    call(onGetUserClaim),
    call(onDelUsers),
    call(onUpdateUserProperty),
    call(onGetActiveLandlord),
    call(onDeleteLandlord),
    call(onGetLandlordTree),
    call(onGetVPTree),
    call(onGetRMTree),
    call(onGetUserBuildingSearch),
    call(onSetDelegationMoveOut),
    call(onGetUserList),
  ]);
}
