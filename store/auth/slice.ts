import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authActions } from './actions';
import { AuthSlice } from './types';

export const initialAuthState: AuthSlice = {
  isLoggedIn: 'unknown',
  name: '<loading>',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  extraReducers: builder =>
    builder
      .addCase(authActions.login.fulfilled, (slice, { payload }) => {
        slice.name = payload.name;
        slice.isLoggedIn = true;
      })
      .addCase(authActions.logout.fulfilled, slice => {
        delete slice.name;
        slice.isLoggedIn = false;
      }),
  reducers: {
    checkLoginStatus: (state, action: PayloadAction<{ user?: string }>) => {
      state.isLoggedIn = typeof document !== 'undefined' && document.cookie.includes('Auth=true');
      state.name = action.payload.user;
    },
  },
});
