
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../types"; 

interface FormState {
  formData: FormData[] | null;
  currentForm: FormData | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  formData: null,
  currentForm: null, 
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    fetchFormRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchFormSuccess(state, action: PayloadAction<FormData[]>) {
      state.loading = false;
      state.formData = action.payload;
    },
    fetchFormFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFormByWorkspaceAndFormIdRequest(state, action: PayloadAction<{workspaceId: string, formId: string}>) {
      state.loading = true;
      state.error = null;
    },
    fetchFormByWorkspaceAndFormIdSuccess(state, action: PayloadAction<FormData>) {
      state.loading = false;
      state.currentForm = action.payload; 
    },
    fetchFormByWorkspaceAndFormIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createFormRequest(state, action: PayloadAction<{ workspaceId: string, formData: any, name: string }>) {
      state.loading = true;
      state.error = null;
    },
    createFormSuccess(state) {
      state.loading = false;
    },
    createFormFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateFormRequest(state, action: PayloadAction<{ workspaceId: string, formId: string, formJson: any }>) {
      state.loading = true;
      state.error = null;
    },
    updateFormSuccess(state, action: PayloadAction<FormData>) {
      state.loading = false;
      state.currentForm = action.payload; 
    },
    updateFormFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteFormRequest(state, action: PayloadAction<{ workspaceId: string, formId: string }>) {
      state.loading = true;
      state.error = null;
    },
    deleteFormSuccess(state, action: PayloadAction<{ workspaceId: string, formId: string }>) {
      state.loading = false;
      if(state?.formData) {
        state.formData = state.formData.filter(
            (form) => form.workspaceId !== action.payload.workspaceId || form.id !== action.payload.formId
        );
      }
    },
    deleteFormFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFormRequest,
  fetchFormSuccess,
  fetchFormFailure,
  fetchFormByWorkspaceAndFormIdRequest,
  fetchFormByWorkspaceAndFormIdSuccess,
  fetchFormByWorkspaceAndFormIdFailure,
  createFormRequest,
  createFormSuccess,
  createFormFailure,
  updateFormRequest,
  updateFormSuccess,
  updateFormFailure,
  deleteFormRequest,
  deleteFormSuccess,
  deleteFormFailure,
} = formSlice.actions;

export default formSlice.reducer;
