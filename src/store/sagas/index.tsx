import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import { workspaceSaga } from './workspaceSaga';
import { formSaga } from './formSagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    workspaceSaga(),
    formSaga()
  ]);
}