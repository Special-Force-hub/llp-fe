import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getTitle, getFile } from './APIs/doc';

import types from '../constants/documentConstants';

import {
  setDocTitleAction,
  setErrorAction,
  setDocFileAction,
  setDocLoadingAction,
} from '../actions/documentActions';

function* getDocTitleSaga({ payload }) {
  try {
    const res = yield getTitle(payload);
    yield put(setDocTitleAction(res));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetDocTitle() {
  yield takeLatest(types.GET_DOCTITLE, getDocTitleSaga);
}

function* getDocFileSaga({ payload }) {
  try {
    yield put(setDocLoadingAction(true));
    const res = yield getFile(payload);
    yield put(setDocFileAction(res));
    yield put(setDocLoadingAction(false));
  } catch (error) {
    yield put(setErrorAction(error.response.data.message));
  }
}

function* onGetDocFile() {
  yield takeLatest(types.GET_DOCFILE, getDocFileSaga);
}

export default function* docSaga() {
  yield all([call(onGetDocTitle), call(onGetDocFile)]);
}
