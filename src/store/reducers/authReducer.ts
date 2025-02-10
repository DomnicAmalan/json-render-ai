import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthCredentials, AuthState, User } from '../types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest(state, action: PayloadAction<AuthCredentials>) {
      state.loading = true;
      state.error = null;
    },
    signinRequest(state, action: PayloadAction<AuthCredentials>) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    signinSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    signinFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    signoutRequest(state) {
      state.loading = true;
    },
    signoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    signoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signupSuccess,
  signupFailure,
  signinSuccess,
  signinFailure,
  signoutRequest,
  signoutSuccess,
  signoutFailure,
  signupRequest,
  signinRequest,
} = authSlice.actions;

export default authSlice.reducer;
