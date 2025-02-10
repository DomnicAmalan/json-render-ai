// formSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
    fetchFormRequest, fetchFormSuccess, fetchFormFailure,
    fetchFormByWorkspaceAndFormIdRequest, fetchFormByWorkspaceAndFormIdSuccess, fetchFormByWorkspaceAndFormIdFailure,
    createFormRequest, createFormSuccess, createFormFailure,
    deleteFormSuccess,
    deleteFormFailure,
    updateFormSuccess,
    updateFormFailure,
    updateFormRequest,
    deleteFormRequest
} from "../reducers/formReducer";
import { fetchFormApi, createFormApi, fetchFormByWorkspaceAndFormIdApi, deleteFormApi, updateFormApi } from "../../api";
import { FormData } from '../types';
import { PayloadAction } from "@reduxjs/toolkit";
import { UpdateFormParams } from "../../api/types";

function* fetchFormSaga(action: PayloadAction<string>) {
    try {
        const formData: FormData[] = yield call(fetchFormApi, action.payload);
        yield put(fetchFormSuccess(formData));
    } catch (error: any) {
        yield put(fetchFormFailure(error.message));
    }
}

function* fetchFormByWorkspaceAndFormIdSaga(action: PayloadAction<{ workspaceId: string, formId: string }>) {
    try {
        const formData: FormData = yield call(fetchFormByWorkspaceAndFormIdApi, action.payload);
        yield put(fetchFormByWorkspaceAndFormIdSuccess(formData));
    } catch (error: any) {
        yield put(fetchFormByWorkspaceAndFormIdFailure(error.message));
    }
}

function* createFormSaga(action: PayloadAction<{ workspaceId: string, formData: any, name: string }>) {
    try {
        yield call(createFormApi, action.payload);
        yield put(createFormSuccess());
    } catch (error: any) {
        yield put(createFormFailure(error.message));
    }
}

function* updateFormSaga(action: PayloadAction<UpdateFormParams>) {
    try {
        const updatedForm: FormData = yield call(updateFormApi, action.payload);
        yield put(updateFormSuccess(updatedForm));
    } catch (error: any) {
        yield put(updateFormFailure(error.message));
    }
}

function* deleteFormSaga(action: PayloadAction<{ workspaceId: string, formId: string, formJson: any }>) {
    try {
        yield call(deleteFormApi, action.payload);
        yield put(deleteFormSuccess(action.payload));
    } catch (error: any) {
        yield put(deleteFormFailure(error.message));
    }
}

export function* formSaga() {
    yield takeLatest(fetchFormRequest.type, fetchFormSaga);
    yield takeLatest(fetchFormByWorkspaceAndFormIdRequest.type, fetchFormByWorkspaceAndFormIdSaga);
    yield takeLatest(createFormRequest.type, createFormSaga);
    yield takeLatest(updateFormRequest.type, updateFormSaga);
    yield takeLatest(deleteFormRequest.type, deleteFormSaga);
}
