import { call, put, takeLatest } from 'redux-saga/effects';
import {
  signupSuccess,
  signupFailure,
  signinSuccess,
  signinFailure,
  signupRequest,
  signinRequest,
  signoutRequest,
  signoutSuccess,
  signoutFailure,
} from '../reducers/authReducer';
import { AuthAction, User } from '../types';
import { signinApi, signupApi, signoutApi } from '../../api';

function* signupSaga(action: AuthAction) {
  try {
    const data: User = yield call(signupApi, action.payload);
    yield put(signupSuccess(data));
    window.location.href = '/signin';
  } catch (error: any) {
    yield put(signupFailure(error.message));
  }
}

function* signinSaga(action: AuthAction) {
  try {
    const data: { user: User; access_token: string } = yield call(signinApi, action.payload);

    localStorage.setItem('token', data.access_token);

    yield put(signinSuccess(data.user));

    window.location.href = '/workspace';
  } catch (error: any) {
    yield put(signinFailure(error.message));
  }
}

function* signoutSaga() {
  try {
    yield call(signoutApi); 

    localStorage.removeItem('token');
    localStorage.removeItem('user'); 

    yield put(signoutSuccess());

    window.location.href = '/signin'; 
  } catch (error: any) {
    yield put(signoutFailure(error.message));
  }
}

export default function* authSagas() {
  yield takeLatest(signupRequest.type, signupSaga);
  yield takeLatest(signinRequest.type, signinSaga);
  yield takeLatest(signoutRequest.type, signoutSaga); 
}
