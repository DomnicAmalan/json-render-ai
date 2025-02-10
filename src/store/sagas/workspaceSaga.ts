
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createWorkspaceRequest,
  createWorkspaceSuccess,
  createWorkspaceFailure,
  fetchWorkspacesRequest,
  fetchWorkspacesSuccess,
  fetchWorkspacesFailure,
} from "../reducers/workspaceReducer";
import { Workspace } from "../types";
import { createWorkspaceApi, fetchWorkspacesApi } from "../../api";

function* createWorkspaceSaga(action: any) {
  try {
    const workspace: Workspace = yield call(createWorkspaceApi, action.payload);
    yield put(createWorkspaceSuccess(workspace));
  } catch (error: any) {
    yield put(createWorkspaceFailure(error.message));
  }
}

function* fetchWorkspacesSaga() {
  try {
    const workspaces: Workspace[] = yield call(fetchWorkspacesApi);
    yield put(fetchWorkspacesSuccess(workspaces));
  } catch (error: any) {
    yield put(fetchWorkspacesFailure(error.message));
  }
}

export function* workspaceSaga() {
  yield takeLatest(createWorkspaceRequest.type, createWorkspaceSaga);
  yield takeLatest(fetchWorkspacesRequest.type, fetchWorkspacesSaga);
}