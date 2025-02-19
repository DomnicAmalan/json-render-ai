
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "../types";

interface WorkspaceState {
  workspaces: Workspace[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  workspaces: [],
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    createWorkspaceRequest(state, _action: PayloadAction<{name: string}>) {
      state.loading = true;
      state.error = null;
    },
    createWorkspaceSuccess(state, action: PayloadAction<Workspace>) {
      state.loading = false;
      state.workspaces.push(action.payload);
    },
    createWorkspaceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWorkspacesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWorkspacesSuccess(state, action: PayloadAction<Workspace[]>) {
      state.loading = false;
      state.workspaces = action.payload;
    },
    fetchWorkspacesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createWorkspaceRequest,
  createWorkspaceSuccess,
  createWorkspaceFailure,
  fetchWorkspacesRequest,
  fetchWorkspacesSuccess,
  fetchWorkspacesFailure,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;