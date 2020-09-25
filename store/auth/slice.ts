import { createSlice } from '@reduxjs/toolkit';

import { authActions } from './actions';
import { AuthSlice } from './types';

export const isAuthed = () => typeof document !== 'undefined' && document.cookie.includes('Auth=true');

export const initialAuthState: AuthSlice = {
  isLoggedIn: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(authActions.login.fulfilled, (slice, { payload }) => {
        slice.name = payload.name;
        slice.isLoggedIn = true;
        slice.loading = false;
      })
      .addCase(authActions.logout.fulfilled, slice => {
        delete slice.name;
        slice.isLoggedIn = false;
        slice.loading = false;
      })
      .addCase(authActions.updateLoginStatus, slice => {
        slice.isLoggedIn = isAuthed();
        slice.loading = false;
      })
      .addMatcher(
        (action): action is ReturnType<typeof authActions.logout.pending> =>
          action.type === authActions.login.pending.type || action.type === authActions.logout.pending.type,
        slice => {
          slice.loading = true;
        },
      )
      .addMatcher(
        (action): action is ReturnType<typeof authActions.logout.rejected> =>
          action.type === authActions.login.rejected.type || action.type === authActions.logout.rejected.type,
        (slice, action) => {
          slice.loading = false;
          console.error(action.error);
        },
      ),
});
